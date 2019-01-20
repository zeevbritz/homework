class Cart {
    constructor(items) {
        this.items = items || {};
    }

    addItem(id, count) {
        let c = this.items[id] || 0;
        this.items[id] = c + count;
    }

    getItems() {
        //{1:5, 2:8}
        const items = Object.keys(this.items).map(id => ({
            count: this.items[id],
            item: global.items.find(i => i.id === +id)
        }));

        // no logic in mustache templates...
        items.forEach(i => i.subtotal = (i.count * i.item.price).toFixed(2));

        return items;
    }

    editCount(id, count) {
        this.items[id] = count;
    }

    removeItem(id) {
        delete this.items[id];
    }
}

module.exports = Cart;