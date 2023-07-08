export class AuthUser {
  readonly id: number;
  readonly uid: string;
  readonly email: string;
  readonly password: string;
  readonly banned: boolean;
  readonly banReason: string;
  readonly created: string;
}
