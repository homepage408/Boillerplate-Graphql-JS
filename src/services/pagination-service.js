class Pagination {
    constructor({ page, size }) {
        if (page < 1) throw new Error("Page must be >= 1");
        this.page = page;

        if (size < 1) throw new Error("Size must be >= 1");
        this.size = size;
    }

    limitOffset() {
        const limit = this.size;
        const offset = (this.page - 1) * limit;

        return { limit, offset };
    };

    paginationRes(count) {
        const totalItems = count
        const currentPages = this.page
        const totalPages = Math.ceil(totalItems / this.size)

        return { totalItems, currentPages, totalPages }
    }
}

export default Pagination 