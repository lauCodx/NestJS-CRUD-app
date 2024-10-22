import { Controller, Req, Get, UseGuards } from "@nestjs/common";
import { AppService } from "./app.service";
import { AuthGuard } from "./middleware/auth.guard";

@UseGuards(AuthGuard)
@Controller()

export class Appcontroller {
    constructor(private appService: AppService){}

    @Get()
    protectedRoute(@Req() req){
        return {message: 'This is a protected route', email: req.user}
    }
}