"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cadastrar = cadastrar;
exports.consultar = consultar;
exports.sacar = sacar;
exports.depositar = depositar;
exports.excluir_conta = excluir_conta;
exports.realizar_deposito = realizar_deposito;
exports.somar_dos_valores_das_contas_existentes = somar_dos_valores_das_contas_existentes;
exports.render_juros_em_uma_conta_poupanca = render_juros_em_uma_conta_poupanca;
exports.salvar_os_dados_no_arquivo = salvar_os_dados_no_arquivo;
exports.carregar_os_dados_a_partir_do_arquivo = carregar_os_dados_a_partir_do_arquivo;
var prompt_sync_1 = require("prompt-sync");
var conta_2_js_1 = require("./conta_2.js");
// Meu Menu para App.js ser lido e carregado.
var input = (0, prompt_sync_1.default)();
// Funcionalidade da opção 1 do menu para aplicativo de banco
function cadastrar(banco) {
    console.log("\nCadastrar conta\n");
    var numero = input('Digite o número da conta:');
    var titular = input('Digite o nome do(a) titular da conta: ');
    var saldo = Number(input('Digite o saldo da conta (R$): '));
    var tipo_de_conta = Number(input('Digite o tipo da conta => 0 - Conta  1 - Poupança:  '));
    var conta;
    if (tipo_de_conta == 0) {
        conta = new conta_2_js_1.Conta(numero, titular, saldo);
    }
    else
        (conta = new conta_2_js_1.Poupanca(numero, titular, saldo, 0));
    banco.inserir(conta);
    console.log("\n");
    console.log(banco);
    console.log("\n");
}
// Funcionalidade da opção 2 de menu para aplicativo de banco
function consultar(banco) {
    var numero_de_conta = input("Digite o numero da conta:");
    var conta;
    for (var _i = 0, _a = banco.getContas(); _i < _a.length; _i++) {
        var conta_atual = _a[_i];
        if (conta_atual.getNumero() == numero_de_conta) {
            conta = conta_atual;
        }
    }
    return conta;
}
// Funcionalidade da opção 3 de menu para aplicativo de banco
function sacar(banco, id_conta, valor_saque) {
    var conta_pesquisada = banco.consultar(id_conta);
    if (conta_pesquisada != undefined) {
        conta_pesquisada.sacar(valor_saque);
    }
}
// Funcionalidade da opção 4 de menu para aplicativo de banco
function depositar(banco, id_conta_deposito, valor_deposito) {
    var conta_pesquisada = banco.consultar(id_conta_deposito);
    // Finalizando opções
    if (conta_pesquisada == null) {
        input("Conta nao existente! presssione <enter>.");
    }
    else {
        conta_pesquisada.depositar(valor_deposito);
    }
}
// Funcionalidade da opção 5 de menu para aplicativo de banco
function excluir_conta(banco, id_conta_a_ser_excluida) {
    if (banco.consultar(id_conta_a_ser_excluida) == undefined) {
        return 0;
    }
    banco.excluir(id_conta_a_ser_excluida);
}
// Funcionalidade da opção 6 de menu para aplicativo de banco
function realizar_deposito(banco, id_conta_origem, id_conta_destino, valor_da_transferencia) {
    var conta_origem = banco.consultar(id_conta_origem);
    var conta_destino = banco.consultar(id_conta_destino);
    var verifica_se_ambas_contas_existem = conta_origem != undefined && conta_destino != undefined;
    if (verifica_se_ambas_contas_existem) {
        if (conta_origem.sacar(valor_da_transferencia) == true) {
            conta_destino.depositar(valor_da_transferencia);
        }
        else {
            console.log("\n\nNao ha saldo suficiente para realizar a transferencia!!!!\n\n");
        }
    }
}
// Funcionalidade da opção 7 de menu para aplicativo de banco
function somar_dos_valores_das_contas_existentes(banco) {
    return banco.somar_saldo_todas_as_contas();
}
// Funcionalidade da opção 8 do menu para aplicativo de banco
function render_juros_em_uma_conta_poupanca(banco, numero_da_conta_poupanca) {
    return banco.renderJuros(numero_da_conta_poupanca);
}
// Funcionalidade da opção 9 do menu para aplicativo de banco
function salvar_os_dados_no_arquivo(banco) {
    banco.salvarArquivo();
}
// Funcioanlidade da opção 10 do menu para aplicativo de banco
function carregar_os_dados_a_partir_do_arquivo(banco) {
    banco.carregarArquivo();
}
