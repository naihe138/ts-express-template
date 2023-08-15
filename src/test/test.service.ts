import express, { Request, Response } from 'express';
// import { resError, resSuccess } from '../utils/resHandle';
import axios from 'axios';
const testService = express.Router();

// 新增标签
testService.get(`/`, async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  // Send initial comment to establish connection
  res.write(': Comment\n\n');
  let n = 0;
  const intervalId = setInterval(() => {
    n++;
    const eventData = `data: ${JSON.stringify({ message: 'Hello, SSE!' + n })}\n\n`;
    res.write(eventData);
  }, 1000);

  // When the client closes the connection, stop sending data
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

const CancelToken = axios.CancelToken;

// 新增标签
testService.get(`/ask`, async (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const source = CancelToken.source();
  // Create a request to the Java SSE service
  const javaSseUrl = 'https://aiproxy.io/api/library/ask?stream=true&query=123&libraryId=10817&model=gpt-3.5-turbo'; // Replace with your Java SSE service URL
  const javaSseRequest = axios.get(javaSseUrl, {
    responseType: 'stream',
    cancelToken: source.token,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer xxx`,
      Cookie: 'sessionId=xxx',
    },
  });

  // Forward Java SSE data to Node.js SSE response
  javaSseRequest
    .then((javaResponse) => {
      javaResponse.data.on('data', (chunk) => {
        const dataChunk = chunk.toString();
        if (dataChunk) {
          res.write(dataChunk);
        }
      });

      javaResponse.data.on('end', () => {
        // Java SSE connection closed, close Node.js SSE response
        res.end();
      });

      javaResponse.data.on('error', (error) => {
        console.error('1Java SSE request error:', error);
        res.end();
      });

      // When the client closes the connection, stop forwarding Java SSE data
      req.on('close', () => {
        // javaSseRequest.abort();
        source.cancel();
        res.end();
      });
    })
    .catch((error) => {
      console.error('2Java SSE request error:', error);
      res.end();
    });
});

export default testService;
