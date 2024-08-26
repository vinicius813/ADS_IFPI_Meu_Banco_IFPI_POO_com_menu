export class Conta {
    private numero : string
    private nome : string
    private saldo : number

    constructor(numero : string, nome : string, saldo : number) {
        this.numero = numero
        this.nome = nome
        this.saldo = saldo
    }

    sacar(valor : number) : boolean {
        if (this.saldo >= valor) {
            this.saldo -= valor
            return true
        } return false
    }

    depositar(valor : number) : void {
        this.saldo += valor
    }

    consultar() : number {
        return this.saldo
    }

    transferir(contaDestino : Conta, valor : number) : boolean {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor)
            return true
        } return false
    }

// Atributo Números
    getNumero(): string {
    return this.numero
    }

    setNumero(novo_numero: string) {
    this.numero = novo_numero
    }

// Atributo Nome
    getNome(): string {
    return this.nome
   }

    setNome(novo_nome: string) {
    this.nome = novo_nome
    }

// Atributo Saldo
    getSaldo(): number {
    return this.saldo
   }

    setSaldo(novo_saldo: number) {
    this.saldo = novo_saldo
    }
}

export class Poupanca extends Conta {
    private _taxaDeJuros: number = 0

    constructor(numero: string, nome: string, saldo: number, taxaDeJuros: number) {
        super(numero, nome, saldo)
        this._taxaDeJuros = taxaDeJuros
    }

    public renderJuros(): void {
        this.depositar(this.getSaldo() * this._taxaDeJuros / 100)
    }

    public getTaxaDeJuros(): number {
        return this._taxaDeJuros
    }

    public setTaxaDeJuros(nova_taxa_de_juros: number): void {
        this._taxaDeJuros = nova_taxa_de_juros
    }
}

export class ContaImposto extends Conta {
    private _taxaDeDesconto: number

    constructor(numero: string, nome: string, saldo: number, taxaDeDesconto: number) {
        super(numero, nome, saldo)
        this._taxaDeDesconto = taxaDeDesconto
    }

    public getTaxaImposto() {
        return this._taxaDeDesconto
    }
}






