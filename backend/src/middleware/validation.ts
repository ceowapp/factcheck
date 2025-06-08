import { Request, Response, NextFunction } from 'express';
import { Claim, Evidence } from '../models/Claim';
import { User } from '../models/User';

export const validateClaim = (req: Request, res: Response, next: NextFunction) => {
  const { content, source } = req.body;

  if (!content || typeof content !== 'string' || content.length < 10) {
    return res.status(400).json({
      error: 'Invalid claim content. Must be a string with at least 10 characters.',
    });
  }

  if (!source || typeof source !== 'string') {
    return res.status(400).json({
      error: 'Invalid source. Must be a string.',
    });
  }

  next();
};

export const validateEvidence = (req: Request, res: Response, next: NextFunction) => {
  const { type, content, source, reliability } = req.body;

  if (!type || !['text', 'image', 'video', 'link'].includes(type)) {
    return res.status(400).json({
      error: 'Invalid evidence type. Must be one of: text, image, video, link',
    });
  }

  if (!content || typeof content !== 'string') {
    return res.status(400).json({
      error: 'Invalid evidence content. Must be a string.',
    });
  }

  if (!source || typeof source !== 'string') {
    return res.status(400).json({
      error: 'Invalid evidence source. Must be a string.',
    });
  }

  if (typeof reliability !== 'number' || reliability < 0 || reliability > 1) {
    return res.status(400).json({
      error: 'Invalid reliability score. Must be a number between 0 and 1.',
    });
  }

  next();
};

export const validateVerification = (req: Request, res: Response, next: NextFunction) => {
  const { method, confidence, notes } = req.body;

  if (!method || !['manual', 'ai', 'hybrid'].includes(method)) {
    return res.status(400).json({
      error: 'Invalid verification method. Must be one of: manual, ai, hybrid',
    });
  }

  if (typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
    return res.status(400).json({
      error: 'Invalid confidence score. Must be a number between 0 and 1.',
    });
  }

  if (notes && typeof notes !== 'string') {
    return res.status(400).json({
      error: 'Invalid notes. Must be a string.',
    });
  }

  next();
};

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password, displayName } = req.body;

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({
      error: 'Invalid email address',
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      error: 'Password must be at least 6 characters long',
    });
  }

  if (!displayName || typeof displayName !== 'string' || displayName.length < 2) {
    return res.status(400).json({
      error: 'Display name must be at least 2 characters long',
    });
  }

  next();
}; 