
export class SearchUserDto {
    constructor(
        public readonly name?: string,
        public readonly email?: string,
        public readonly id?: string,
    ) {}
}