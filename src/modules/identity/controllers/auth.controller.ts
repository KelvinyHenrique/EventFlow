import { Body, Controller, Injectable, Post } from "@nestjs/common";
import { LoginParams } from "../dto/login-params.dto";
import { AuthService } from "../services/auth.service";



@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Body() loginParams: LoginParams) {
        return await this.authService.login(loginParams.email, loginParams.password);
    }
}