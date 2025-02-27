function padString(input: string): string {
  const segmentLength = 4;
  const stringLength = input.length;
  const diff = stringLength % segmentLength;

  if (!diff) {
    return input;
  }

  let position = stringLength;
  let padLength = segmentLength - diff;
  const paddedStringLength = stringLength + padLength;
  const buffer = Buffer.alloc(paddedStringLength);

  buffer.write(input);

  while (padLength--) {
    buffer.write('=', position++);
  }

  return buffer.toString();
}

function encodeSafe(
  input: string | Buffer,
  encoding: BufferEncoding = 'utf8',
): string {
  if (Buffer.isBuffer(input)) {
    return fromBase64(input.toString('base64'));
  }
  return fromBase64(Buffer.from(input as string, encoding).toString('base64'));
}

function decodeSafe(
  base64url: string,
  encoding: BufferEncoding = 'utf8',
): string {
  return Buffer.from(toBase64(base64url), 'base64').toString(encoding);
}

function encode(
  input: string | Buffer,
  encoding: BufferEncoding = 'utf8',
): string {
  if (Buffer.isBuffer(input)) {
    return input.toString('base64');
  }
  return Buffer.from(input as string, encoding).toString('base64');
}

function decode(base64url: string, encoding: BufferEncoding = 'utf8'): string {
  return Buffer.from(base64url, 'base64').toString(encoding);
}

function toBase64(base64url: string | Buffer): string {
  // We this to be a string so we can do .replace on it. If it's
  // already a string, this is a noop.
  base64url = base64url.toString();
  return padString(base64url).replace(/\-/g, '+').replace(/_/g, '/');
}

function fromBase64(base64: string): string {
  return base64.replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function fromBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response: any = {};

  if (matches.length !== 3) {
    return null;
  }

  response.mimetype = matches[1];
  response.buffer = Buffer.from(matches[2], 'base64');

  return response;
}

export interface Base64Url {
  (input: string | Buffer, encoding?: string): string;
  encodeSafe(input: string | Buffer, encoding?: string): string;
  decodeSafe(base64url: string, encoding?: string): string;
  encode(input: string | Buffer, encoding?: string): string;
  decode(base64url: string, encoding?: string): string;
  toBase64(base64url: string | Buffer): string;
  fromBase64(base64: string): string;
  toBuffer(base64url: string): Buffer;
  fromBase64Image(base64url: string): { mimetype: string; buffer: Buffer };
}

const base64url = encode as Base64Url;

base64url.encodeSafe = encodeSafe;
base64url.decodeSafe = decodeSafe;
base64url.encode = encode;
base64url.decode = decode;
base64url.toBase64 = toBase64;
base64url.fromBase64 = fromBase64;
base64url.fromBase64Image = fromBase64Image;

export default base64url;
