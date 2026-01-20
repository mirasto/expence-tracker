export const getAuthErrorMessageKey = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'auth.errors.invalidCredential';
    case 'auth/email-already-in-use':
      return 'auth.errors.emailAlreadyInUse';
    default:
      return 'auth.errors.default';
  }
};
