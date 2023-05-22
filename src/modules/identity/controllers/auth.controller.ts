import { Body, Controller, Injectable, Post, Res } from "@nestjs/common";
import { LoginParams } from "../dto/login-params.dto";
import { AuthService } from "../services/auth.service";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() loginParams: LoginParams, @Res() res: any) {
        if (await this.authService.login(loginParams.email, loginParams.password)) {
            return res.status(200).json({ message: 'User logged in successfully' });
        }
        return res.status(400).json({ message: 'Email or password incorrect' });
    }
}