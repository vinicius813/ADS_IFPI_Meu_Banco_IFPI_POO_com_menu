"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prompt_sync_1 = require("prompt-sync");
var banco_2_js_1 = require("./banco_2.js");
var funcoes_adicionais_do_app_js_1 = require("./funcoes_adicionais_do_app.js");
//criacao do meu botão de dados input para receber os dados primeiros.
var input = (0, prompt_sync_1.default)();
// Classe banco sendo instanciado e criado a partir um nova classe, isto é, o objeto Banco.
var banco = new banco_2_js_1.Banco();
// Menu e suas funcionalidades
var opcao = '';
do {
    console.log(" \n                          Hello, Good morning, Good afternoon or Good evenning, mine clients!!! \n                    We are welcome in my Bank!!!\n\n                ---Digite uma op\u00E7\u00E3o v\u00E1lida: ");
    console.log("\n            1 - Cadastrar, 2 - Consultar, 3 - Sacar, 4 - Depositar, 5 - Excluir \n\n        +   6 - Transferir, 7 \u2013 Totaliza\u00E7\u00F5es \n\n        +   8 - Render Juros, 9 - Salvar em arquivo, 10-Carregar arquivo \n\n            0 - Sair  \n");
    opcao = input("Opção:");
    switch (opcao) {
        case "1":
            (0, funcoes_adicionais_do_app_js_1.cadastrar)(banco);
            break;
        case "2":
            var controle_pesquisa_de_contas = true;
            while (controle_pesquisa_de_contas) {
                var conta_pesquisada = (0, funcoes_adicionais_do_app_js_1.consultar)(banco);
                if (conta_pesquisada == null) {
                    console.log("N\u00E3o existe uma conta com esse numero!!! \n");
                }
                else {
                    console.log(conta_pesquisada);
                    console.log("\n\n");
                }
                var pergunta_cliente = Number(input("\n Desejas pesquisar novamente? (1 - Sim, 0 - N\u00E3o): \n"));
                if (pergunta_cliente == 1) {
                    true;
                }
                else {
                    controle_pesquisa_de_contas = false;
                }
            }
            break;
        case "3":
            var id_conta_saque = input("Digite o id da conta: ");
            var valor_saque = Number(input("Digite o valor do saque (R$): "));
            (0, funcoes_adicionais_do_app_js_1.sacar)(banco, id_conta_saque, valor_saque);
            break;
        case "4":
            var id_conta_deposito = input("Digite o id da conta: ");
            var valor_deposito = Number(input("Digite o valor do deposito (R$): "));
            (0, funcoes_adicionais_do_app_js_1.depositar)(banco, id_conta_deposito, valor_deposito);
            break;
        case "5":
            var id_conta_a_ser_excluida = input("Digite o id da conta: ");
            (0, funcoes_adicionais_do_app_js_1.excluir_conta)(banco, id_conta_a_ser_excluida);
            break;
        case "6":
            var id_conta_origem = input("Digite o id da conta origem: ");
            var id_conta_destino = input("Digite o id da conta destino: ");
            var valor_a_ser_transferido = Number(input("Digite o valor a ser transferido (R$): "));
            (0, funcoes_adicionais_do_app_js_1.realizar_deposito)(banco, id_conta_origem, id_conta_destino, valor_a_ser_transferido);
            break;
        case "7":
            console.log("Totalizacao dos valores (R$): ".concat((0, funcoes_adicionais_do_app_js_1.somar_dos_valores_das_contas_existentes)(banco)));
            break;
        case "8":
            var numero_conta = input("Digite o numero da conta poupanca que sera aplicado os juros: ");
            // Falha final, de acordo?
            if ((0, funcoes_adicionais_do_app_js_1.render_juros_em_uma_conta_poupanca)(banco, numero_conta) == 0) {
                console.log("N\u00E3o foi possivel render juros na conta de numero ".concat(numero_conta, " !!"));
            }
            else {
                console.log("Operacao de render juros na conta de numero ".concat(numero_conta, " foi realizada com sucesso!!!"));
            }
            break;
        case "9":
            (0, funcoes_adicionais_do_app_js_1.salvar_os_dados_no_arquivo)(banco);
            break;
        case "10":
            (0, funcoes_adicionais_do_app_js_1.carregar_os_dados_a_partir_do_arquivo)(banco);
            break;
        case "0":
            (0, funcoes_adicionais_do_app_js_1.salvar_os_dados_no_arquivo)(banco);
            break;
        // Assim vai indo a aplicação do sistema bancário....[...]
    }
    input("Operação finalizada. Digite <enter>");
} while (opcao != "0");
console.log("Aplicação encerrada com sucesso!");
