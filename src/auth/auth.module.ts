import { Module } from "@nestjs/common";
import { UsuarioModule } from "../usuario/usuario.module";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./services/auth.service";

@Module({
    imports: [UsuarioModule],
    providers: [AuthService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {}