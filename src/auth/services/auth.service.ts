import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsuarioService } from "../../usuario/services/usuario.service";
import { UsuarioLogin } from "../entities/auth.entity";

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
    ) { }

    async login(usuarioLogin: UsuarioLogin) {
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

        if (!buscaUsuario)
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);


        if (buscaUsuario.senha !== usuarioLogin.senha) {
            throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);
        }

        return {
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            foto: buscaUsuario.foto,
        };
    }
}