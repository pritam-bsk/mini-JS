import { TokenType } from "./token.js";

export class Lexer {
    constructor(source) {
        this.source = source
        this.tokens = []
        this.current = 0
        this.line = 1
    }

    scanTokens() {
        while (!this.isAtEnd()) {
            this.start = this.current;
            this.scanToken();
        }
        this.tokens.push({
            type: TokenType.EOF,
            lexeme: "",
            literal: null,
            line: this.line
        });
        return this.tokens;
    }

    advance() {
        return this.source[this.current++];
    }

    present() {
        if (this.isAtEnd()) return '\0';
        return this.source[this.current];
    }

    addToken(type, literal = null) {
        this.tokens.push({
            type: type,
            lexeme: this.source.slice(this.start, this.current),
            literal: literal,
            line: this.line
        });
    }

    match(exp) {
        if (this.isAtEnd()) return false;
        if (this.source[this.current] !== exp) return false;
        this.current++;
        return true;
    }

    scanToken() {
        const c = this.advance();
        switch (c) {
            case '(': this.addToken(TokenType.LEFT_PAREN); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN); break;
            case '{': this.addToken(TokenType.LEFT_BRACE); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE); break;
            case ',': this.addToken(TokenType.COMMA); break;
            case '.': this.addToken(TokenType.DOT); break;
            case '-': this.addToken(TokenType.MINUS); break;
            case '+': this.addToken(TokenType.PLUS); break;
            case ';': this.addToken(TokenType.SEMICOLON); break;
            case '*': this.addToken(TokenType.STAR); break;

            case '|':
                this.addToken(this.match('|') ? TokenType.OR_OR : TokenType.OR);
                break;
            case '&':
                this.addToken(this.match('&') ? TokenType.AND_AND : TokenType.AND);
                break;
            case '!':
                this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
                break;
            case '=':
                this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
                break;
            case '<':
                this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
                break;
            case '>':
                this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
                break;

            case '/':
                if (this.match('/')) {
                    while (this.present() != '\n' && !this.isAtEnd()) {
                        this.advance();
                    }
                } else {
                    this.addToken(TokenType.SLASH);
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++; break;
            case '"':
                this.string(); break;
            default:
                if (this.isDigit(c)) {
                    this.number();
                } else if (this.isAlpha(c)) {
                    this.identifier();
                } else {
                    throw new Error(`miniJS: unexpexted expression ${c} at line ${this.line}`);
                }
        }
    }

    isDigit(c) {
        return c >= '0' && c <= '9';
    }

    isAlpha(c) {
        return (c >= 'a' && c <= 'z') ||
            (c >= 'A' && c <= 'Z') ||
            c === '_';
    }

    isAlphaNumeric(c) {
        return this.isAlpha(c) || this.isDigit(c);
    }

    identifier() {
        while (this.isAlphaNumeric(this.present())) {
            this.advance();
        }
        const key = this.source.slice(this.start, this.current);
        const type = TokenType.KEYWORDS[key] ?? TokenType.IDENTIFIER;
        this.addToken(type);
    }

    number() {
        // console.log("here");
        while (this.isDigit(this.present())) {
            this.advance();
        }

        if (this.present() === '.' && this.current + 1 < this.source.length && this.isDigit(this.source[this.current + 1])) {
            this.advance();
            while (this.isDigit(this.present())) {
                this.advance();
            }
        }

        this.addToken(TokenType.NUMBER, Number(this.source.slice(this.start, this.current)))
    }

    string() {
        while (this.present() !== '"' && !this.isAtEnd()) {
            if (this.present() === '\n') this.line++;
            this.advance();
        }
        if (this.isAtEnd()) throw new Error(`MiniJs: Unterminated string at line ${this.line}`)
        this.advance();
        this.addToken(TokenType.STRING, this.source.slice(this.start + 1, this.current - 1));
    }

    isAtEnd() {
        return this.current >= this.source.length
    }
}