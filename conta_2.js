"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContaImposto = exports.Poupanca = exports.Conta = void 0;
var Conta = /** @class */ (function () {
    function Conta(numero, nome, saldo) {
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }
    Conta.prototype.sacar = function (valor) {
        if (this.saldo >= valor) {
            this.saldo -= valor;
            return true;
        }
        return false;
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo += valor;
    };
    Conta.prototype.consultar = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        if (this.sacar(valor)) {
            contaDestino.depositar(valor);
            return true;
        }
        return false;
    };
    // Atributo Números
    Conta.prototype.getNumero = function () {
        return this.numero;
    };
    Conta.prototype.setNumero = function (novo_numero) {
        this.numero = novo_numero;
    };
    // Atributo Nome
    Conta.prototype.getNome = function () {
        return this.nome;
    };
    Conta.prototype.setNome = function (novo_nome) {
        this.nome = novo_nome;
    };
    // Atributo Saldo
    Conta.prototype.getSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.setSaldo = function (novo_saldo) {
        this.saldo = novo_saldo;
    };
    return Conta;
}());
exports.Conta = Conta;
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, nome, saldo, taxaDeJuros) {
        var _this = _super.call(this, numero, nome, saldo) || this;
        _this._taxaDeJuros = 0;
        _this._taxaDeJuros = taxaDeJuros;
        return _this;
    }
    Poupanca.prototype.renderJuros = function () {
        this.depositar(this.getSaldo() * this._taxaDeJuros / 100);
    };
    Poupanca.prototype.getTaxaDeJuros = function () {
        return this._taxaDeJuros;
    };
    Poupanca.prototype.setTaxaDeJuros = function (nova_taxa_de_juros) {
        this._taxaDeJuros = nova_taxa_de_juros;
    };
    return Poupanca;
}(Conta));
exports.Poupanca = Poupanca;
var ContaImposto = /** @class */ (function (_super) {
    __extends(ContaImposto, _super);
    function ContaImposto(numero, nome, saldo, taxaDeDesconto) {
        var _this = _super.call(this, numero, nome, saldo) || this;
        _this._taxaDeDesconto = taxaDeDesconto;
        return _this;
    }
    ContaImposto.prototype.getTaxaImposto = function () {
        return this._taxaDeDesconto;
    };
    return ContaImposto;
}(Conta));
exports.ContaImposto = ContaImposto;
