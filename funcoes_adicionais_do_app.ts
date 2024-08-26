import prompt from "prompt-sync";
import {Banco} from "./banco_2.js"
import {Conta, Poupanca} from "./conta_2.js"

// Meu Menu para App.js ser lido e carregado.

let input = prompt()

// Funcionalidade da opção 1 do menu para aplicativo de banco

export function cadastrar(banco: Banco): void {
        console.log("\nCadastrar conta\n");
            let numero = input('Digite o número da conta:');
            let titular = input('Digite o nome do(a) titular da conta: ')
            let saldo = Number(input('Digite o saldo da conta (R$): '));
            let tipo_de_conta = Number(input('Digite o tipo da conta => 0 - Conta  1 - Poupança:  '));

    let conta: Conta;

    if (tipo_de_conta == 0) {
            conta = new Conta(numero,titular,saldo) 
    }else (conta = new Poupanca(numero,titular,saldo,0))

     banco.inserir(conta)
            console.log("\n")
        console.log(banco)
        console.log("\n")
}

// Funcionalidade da opção 2 de menu para aplicativo de banco

export function consultar(banco: Banco) {
    let numero_de_conta=input("Digite o numero da conta:")
    let conta!:Conta
    
    for (const conta_atual of banco.getContas()) {
        if(conta_atual.getNumero()==numero_de_conta) {
            conta=conta_atual
        }
    }

    return conta
}

// Funcionalidade da opção 3 de menu para aplicativo de banco

export function sacar(banco: Banco,id_conta: string,valor_saque:number) {
        let conta_pesquisada=banco.consultar(id_conta)

                if(conta_pesquisada!=undefined){
                    conta_pesquisada.sacar(valor_saque)
                }
}


// Funcionalidade da opção 4 de menu para aplicativo de banco

export function depositar(banco: Banco,id_conta_deposito: string,valor_deposito: number) {
    
    let conta_pesquisada=banco.consultar(id_conta_deposito)

    // Finalizando opções

    if(conta_pesquisada == null) {
        input("Conta nao existente! presssione <enter>.")
    } else {
        conta_pesquisada.depositar(valor_deposito)
    }
}

// Funcionalidade da opção 5 de menu para aplicativo de banco

export function excluir_conta(banco: Banco,id_conta_a_ser_excluida: string) {

    if(banco.consultar(id_conta_a_ser_excluida) == undefined){
        return 0
    }

    banco.excluir(id_conta_a_ser_excluida)
}


// Funcionalidade da opção 6 de menu para aplicativo de banco

export function realizar_deposito(banco: Banco,id_conta_origem: string,id_conta_destino: string,valor_da_transferencia: number) {

    let conta_origem = banco.consultar(id_conta_origem)
    let conta_destino = banco.consultar(id_conta_destino)

    let verifica_se_ambas_contas_existem:boolean = conta_origem != undefined  &&  conta_destino != undefined

                if(verifica_se_ambas_contas_existem) {

                       if(conta_origem.sacar(valor_da_transferencia) == true) {
                                conta_destino.depositar(valor_da_transferencia)
                       } else {
            console.log("\n\nNao ha saldo suficiente para realizar a transferencia!!!!\n\n")
                        }
        
                }
}

// Funcionalidade da opção 7 de menu para aplicativo de banco

export function somar_dos_valores_das_contas_existentes(banco: Banco) {

    return banco.somar_saldo_todas_as_contas()
}

// Funcionalidade da opção 8 do menu para aplicativo de banco

export function render_juros_em_uma_conta_poupanca(banco: Banco,numero_da_conta_poupanca: string) {

   return banco.renderJuros(numero_da_conta_poupanca)
}

// Funcionalidade da opção 9 do menu para aplicativo de banco

export function salvar_os_dados_no_arquivo(banco: Banco) {

     banco.salvarArquivo()
}

// Funcioanlidade da opção 10 do menu para aplicativo de banco

export function carregar_os_dados_a_partir_do_arquivo(banco: Banco) {

    banco.carregarArquivo()
}