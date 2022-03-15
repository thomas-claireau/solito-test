import { passwordCheckHandler } from '@storyofams/next-password-protect';

export default passwordCheckHandler(process.env.NEXT_PASSWORD, {
  // Options go here (optional)
  cookieName: 'next-password-protect',
});
