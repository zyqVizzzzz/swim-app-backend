// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { UsersService } from 'src/users/users.service';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService<T> {
//   constructor(
//     private usersService: UsersService<T>,
//     private jwtService: JwtService,
//   ){}

//   async validateUser(email: string, pass: string): Promise<any> {
//     const user = await this.usersService.findOneByEmail(email);
//     if (user && await bcrypt.compare(pass, user.password_hash)) {
//       const { password_hash, ...result } = user;
//       return result;
//     }
//     return null;
//   }

//   async login(user: any) {
//     const payload = { email: user.email, sub: user.userId };
//     return {
//       access_token: this.jwtService.sign(payload),
//     };
//   }
// }