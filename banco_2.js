"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var conta_2_js_1 = require("./conta_2.js");
var fs = require("fs");
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
        this.DESTINO_CONTAS = "./contas.txt";
    }
    Banco.prototype.inserir = function (conta) {
        var retorno_do_consultar = this.consultar(conta.getNumero());
        console.log(retorno_do_consultar);
        if (retorno_do_consultar == null) {
            this.contas.push(conta);
        }
        else {
            console.log("Conta ".concat(conta.getNumero(), " j\u00E1 cadastrada!"));
        }
        /*
        if (retorno_do_consultar instanceof Conta) {
            return
        }
        this.contas.push(conta)

            if (retorno_do_consultar == null) {
                this.contas.push(conta)
            }
        */
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
                contaProcurada == this.contas[i];
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.ConsultarPorIndice = function (numero) {
        var indiceProcurado = -1;
        for (var i = 0; i < this.contas.length; i++) {
            if (this.contas[i].getNumero() == numero) {
                indiceProcurado = i;
                break;
            }
        }
        return indiceProcurado;
    };
    Banco.prototype.alterar = function (conta) {
        var indiceProcurado = 0;
        this.ConsultarPorIndice(conta.getNumero());
        if (indiceProcurado != -1) {
            this.contas[indiceProcurado] = conta;
        }
    };
    Banco.prototype.excluir = function (numero) {
        var indiceProcurado = this.ConsultarPorIndice(numero);
        if (indiceProcurado != -1) {
            for (var i = indiceProcurado; i < this.contas.length; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    };
    Banco.prototype.sacar = function (numero, valor) {
        var indiceProcurado = this.ConsultarPorIndice(numero);
        if (indiceProcurado != -1) {
            var conta = this.contas[indiceProcurado];
            conta.sacar(valor);
        }
    };
    Banco.prototype.transferir = function (contaOrigem, contaDestino, valor) {
        // Consulta pela existência de contas
        var conta_existente_de_origem = this.ConsultarPorIndice(contaOrigem.getNumero());
        var conta_existente_de_destino = this.ConsultarPorIndice(contaDestino.getNumero());
        // Após isso, verifica-se a existência de 2 contas simultaneamente
        var verificar_contas_existem = conta_existente_de_origem != -1 && conta_existente_de_destino != -1;
        if (verificar_contas_existem) {
            contaOrigem.transferir(contaDestino, valor);
        }
    };
    Banco.prototype.renderJuros = function (numero_poupanca) {
        var resultado_pela_conta_buscada = this.consultar(numero_poupanca);
        // Teste final
        if (resultado_pela_conta_buscada == null) {
            return 0;
        }
        else if (resultado_pela_conta_buscada instanceof conta_2_js_1.Poupanca == false) {
            return 0;
        }
        else {
            var saldo_antes_dos_juros = resultado_pela_conta_buscada.getSaldo();
            var conta_convertida_para_poupanca = resultado_pela_conta_buscada.renderJuros();
            var valor_dos_juros = resultado_pela_conta_buscada.getSaldo() - saldo_antes_dos_juros;
            console.log(conta_convertida_para_poupanca);
            return valor_dos_juros;
        }
    };
    Banco.prototype.contar_quantidade_de_contas = function () {
        return this.contas.length;
    };
    Banco.prototype.somar_saldo_todas_as_contas = function () {
        var soma_saldo = 0;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta_atual = _a[_i];
            soma_saldo = soma_saldo + conta_atual.getSaldo();
        }
        return soma_saldo;
    };
    Banco.prototype.calcular_media_dos_saldos_das_contas = function () {
        return this.somar_saldo_todas_as_contas() / this.contar_quantidade_de_contas();
    };
    Banco.prototype.getContas = function () {
        return this.contas;
    };
    Banco.prototype.setContas = function (novas_contas) {
        this.contas = novas_contas;
    };
    Banco.prototype.carregarArquivo = function () {
        var arquivo = fs.readFileSync(this.DESTINO_CONTAS, 'utf-8');
        //const linhas: string[] = arquivo.split('\n')
        var linhas = arquivo.split('\r\n');
        console.log("Iniciando leitura de arquivo");
        for (var i = 0; i < linhas.length; i++) {
            var linhaConta = linhas[i].split(";");
            var conta = void 0;
            var tipo = linhaConta[3];
            if (tipo == 'C') {
                conta = new conta_2_js_1.Conta(linhaConta[0], linhaConta[1], parseFloat(linhaConta[2]));
            }
            else if (tipo == 'CP') {
                conta = new conta_2_js_1.Poupanca(linhaConta[0], linhaConta[1], parseFloat(linhaConta[2]), parseFloat(linhaConta[4]));
            }
            else if (tipo == 'CI') {
                conta = new conta_2_js_1.ContaImposto(linhaConta[0], linhaConta[1], parseFloat(linhaConta[1]), parseFloat(linhaConta[4]));
            }
            this.inserir(conta);
            console.log("Conta ".concat(conta.getNumero(), " carregada"));
        }
        /*
        linhas.forEach(linha => {
            let linhaConta: string[] = linha.split(";");
            let conta!: Conta;
            let tipo: string  = linhaConta[2];
            if (tipo == 'C') {
                conta = new Conta(linhaConta[0], parseFloat(linhaConta[1]));
            } else if (tipo == 'CP') {
                conta = new Poupanca(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
            } else if (tipo == 'CI') {
                conta = new ContaImposto(linhaConta[0], parseFloat(linhaConta[1]),parseFloat(linhaConta[3]));
            }

            this.inserir(conta);
            console.log(`Conta ${conta.numero} carregada`);
            


           });*/
        console.log("fim do arquivo");
    };
    Banco.prototype.salvarArquivo = function () {
        console.log("Iniciando a gravação de contas em arquivo.");
        var stringContas = "";
        var linha = "";
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta instanceof conta_2_js_1.Poupanca) {
                linha = "".concat(conta.getNumero(), ";").concat(conta.getNome(), ";").concat(conta.getSaldo(), ";CP;").concat(conta.getTaxaDeJuros(), "\r\n");
            }
            else if ((conta instanceof conta_2_js_1.ContaImposto)) {
                linha = "".concat(conta.getNumero(), ";").concat(conta.getNome(), ";").concat(conta.getSaldo(), ";CI;").concat(conta.getTaxaImposto(), "\r\n");
            }
            else {
                linha = "".concat(conta.getNumero(), ";").concat(conta.getNome(), ";").concat(conta.getSaldo(), ";C\r\n");
            }
            stringContas = stringContas + linha;
        }
        //Para finalizar uns detalhes, deeleta-se os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia.
        stringContas = stringContas.slice(0, stringContas.length - 2);
        fs.writeFileSync(this.DESTINO_CONTAS, stringContas, 'utf-8');
        console.log("Contas salvas em arquivo único.");
    };
    return Banco;
}());
exports.Banco = Banco;
/*

let banco=new Banco()
banco.inserir(new Conta("123","vinicius",100))
banco.inserir(new Conta("4","carmem",200))
banco.inserir(new Conta("123","julia",200))
console.log(banco)

console.log(`-----------------------------
Saldo Total
R$  ${banco.somar_saldo_todas_as_contas()}
conta(s) existente(s): ${banco.contar_quantidade_de_contas()} conta(s).
------------------------------------------
`)

     */
