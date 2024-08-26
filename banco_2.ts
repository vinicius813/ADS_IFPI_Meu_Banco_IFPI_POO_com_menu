import {Conta, Poupanca, ContaImposto} from "./conta_2.js"
import * as fs from "fs"

export class Banco {
    private contas: Conta[] = []
    private DESTINO_CONTAS: string = "./contas.txt"

    public inserir(conta: Conta): void {
        let retorno_do_consultar = this.consultar(conta.getNumero())
        console.log(retorno_do_consultar)

        if (retorno_do_consultar == null) {
            this.contas.push(conta)
        }else{
            console.log(`Conta ${conta.getNumero()} já cadastrada!`)
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
    }

    public consultar(numero: string): Conta {
        let contaProcurada !: Conta

            for(let i: number = 0; i < this.contas.length; i++) {
                if (this.contas[i].getNumero() == numero) {
                    contaProcurada == this.contas[i]
                    break;
                }
            }

            return contaProcurada
    }

    private ConsultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1

            for(let i: number = 0; i < this.contas.length; i++) {
                if (this.contas[i].getNumero() == numero) {
                    indiceProcurado = i
                    break       
                }
            }

            return indiceProcurado
    }

    public alterar(conta: Conta): void {
        let indiceProcurado: number = 0
            this.ConsultarPorIndice(conta.getNumero())

                if (indiceProcurado != -1) {
                    this.contas[indiceProcurado] = conta
                }
    }

    public excluir(numero: string): void {
        let indiceProcurado: number = this.ConsultarPorIndice(numero)

            if (indiceProcurado != -1) {
                for (let i = indiceProcurado; i < this.contas.length; i++) {
                    this.contas[i] = this.contas[i + 1]
                }

            this.contas.pop()
            }
    }

    public sacar(numero: string, valor: number): void {
        let indiceProcurado: number = this.ConsultarPorIndice(numero)

            if (indiceProcurado != -1) {
                let conta: Conta = this.contas[indiceProcurado]
                conta.sacar(valor)
            }
    }

    public transferir(contaOrigem: Conta, contaDestino: Conta, valor: number) {
        // Consulta pela existência de contas
        let conta_existente_de_origem = this.ConsultarPorIndice(contaOrigem.getNumero())
        let conta_existente_de_destino = this.ConsultarPorIndice(contaDestino.getNumero())

        // Após isso, verifica-se a existência de 2 contas simultaneamente
        let verificar_contas_existem: boolean = conta_existente_de_origem != -1 && conta_existente_de_destino != -1

            if (verificar_contas_existem) {
                contaOrigem.transferir(contaDestino, valor)
            }
    }

    public renderJuros(numero_poupanca: string): number {
        let resultado_pela_conta_buscada: Conta = this.consultar(numero_poupanca)

        // Teste final
            if (resultado_pela_conta_buscada == null) {
                return 0
            } else if (resultado_pela_conta_buscada instanceof Poupanca == false) {
                return 0
            } else {
                let saldo_antes_dos_juros = resultado_pela_conta_buscada.getSaldo()
                let conta_convertida_para_poupanca = (<Poupanca> resultado_pela_conta_buscada).renderJuros()
                let valor_dos_juros = resultado_pela_conta_buscada.getSaldo() - saldo_antes_dos_juros
                    console.log(conta_convertida_para_poupanca);

                return valor_dos_juros
            }
    }

    public contar_quantidade_de_contas(): number {
        return this.contas.length
    }

    public somar_saldo_todas_as_contas(): number {
        let soma_saldo: number = 0

            for (const conta_atual of this.contas) {
            soma_saldo = soma_saldo + conta_atual.getSaldo()
            }

        return soma_saldo
    }

    public calcular_media_dos_saldos_das_contas(): number {

        return this.somar_saldo_todas_as_contas() / this.contar_quantidade_de_contas()
    }


    public getContas() {
        return this.contas
    }
    public setContas(novas_contas:Conta[]) {
        this.contas = novas_contas
    }




    public carregarArquivo() {
		const arquivo: string = fs.readFileSync(this.DESTINO_CONTAS, 'utf-8')
		//const linhas: string[] = arquivo.split('\n')
		const linhas: string[] = arquivo.split('\r\n')
		console.log("Iniciando leitura de arquivo")

		        for (let i: number = 0; i < linhas.length; i++) {
			        let linhaConta: string[] = linhas[i].split(";");
			        let conta!: Conta;
			        let tipo: string  = linhaConta[3];
			            if (tipo == 'C') {
				            conta = new Conta(linhaConta[0],linhaConta[1], parseFloat(linhaConta[2]));
			            } else if (tipo == 'CP') {
				            conta = new Poupanca(linhaConta[0],linhaConta[1], parseFloat(linhaConta[2]),parseFloat(linhaConta[4]));
			            } else if (tipo == 'CI') {
				            conta = new ContaImposto(linhaConta[0],linhaConta[1], parseFloat(linhaConta[1]),parseFloat(linhaConta[4]));
			            }

			this.inserir(conta);
			console.log(`Conta ${conta.getNumero()} carregada`);
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
		console.log("fim do arquivo")

	}




	public salvarArquivo() {
		console.log("Iniciando a gravação de contas em arquivo.")
		let stringContas: string = ""
		let linha: string = ""

		            for (let conta of this.contas) {
			                if (conta instanceof Poupanca) {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};CP;${conta.getTaxaDeJuros()}\r\n`;
			                } else if ((conta instanceof ContaImposto)) {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};CI;${conta.getTaxaImposto()}\r\n`;
			                } else {
				linha = `${conta.getNumero()};${conta.getNome()};${conta.getSaldo()};C\r\n`;
			                }

			stringContas = stringContas + linha
		            }
		//Para finalizar uns detalhes, deeleta-se os últimos \r\n da string que vai pro arquivo, evitando que grave uma linha vazia.
		stringContas = stringContas.slice(0,stringContas.length - 2);


		fs.writeFileSync(this.DESTINO_CONTAS, stringContas,'utf-8');
		console.log("Contas salvas em arquivo único.")
	}

}


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






