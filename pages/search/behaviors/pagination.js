const paginationBeh = Behavior({
    data: {
        books: []
    },
    
    methods: {
        setMoreBooks(moreBooks) {
            const newBooks = books.concat(moreBooks)
                this.setData({
                    books: newBooks,
                })
        }
    }
})