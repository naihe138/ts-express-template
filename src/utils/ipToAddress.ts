import { Request } from 'express';
import geoip from 'geoip-lite';
import requestIp from 'request-ip';

interface IIpLocation {
  ip: string;
  city: string;
  range: string;
  country: string;
  agent: string;
  region: string;
  ll: number[];
}

export const getIpInfo = (req: Request): IIpLocation => {
  const clientIp = requestIp.getClientIp(req);

  const ip = clientIp.replace('::ffff:', '') || '14.215.177.38';
  console.log(ip);
  const ipLocation = geoip.lookup('14.215.177.38');
  console.log(ipLocation);
  ipLocation.agent = req.headers['user-agent'];
  if (Array.isArray(ipLocation.range)) {
    ipLocation.range = ipLocation.range.join(',');
  }
  console.log(ipLocation);
  return {
    ip,
    range: ipLocation.range,
    country: ipLocation.country,
    region: ipLocation.region,
    city: ipLocation.city,
    ll: ipLocation.ll,
    agent: ipLocation.agent,
  };
};
