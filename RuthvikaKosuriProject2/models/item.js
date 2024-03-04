const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        title: 'Test item (w)',
        seller: 'Donna',
        condition: 'like new',
        price: '15',
        size: 'small',
        details: 'used once',
        image: '/images/w1.jpg',
        totalOffers: '0',
        active: 'true',
        section: 'women'
    },

    {
        id: '2',
        title: 'Test item (m)',
        seller: 'Harvey',
        condition: 'new',
        price: '40',
        size: 'medium',
        details: 'never used',
        image: '/images/m1.jpg',
        totalOffers: '0',
        active: 'true',
        section: 'men'
    },

    {
        id: '3',
        title: 'Test item (o)',
        seller: 'Mike',
        condition: 'good',
        price: '25',
        size: 'other',
        details: 'pre-loved, still in good shape',
        image: '/images/o1.jpg',
        totalOffers: '0',
        active: 'true',
        section: 'other'
    }
];

exports.find = () => items.sort((a, b) => a.price - b.price);

exports.findById = id => items.find(item => item.id === id);

exports.save = (item) => {
    item.id = uuidv4();
    item.active = 'true';
    item.totalOffers = '0';
    items.push(item);
};

exports.updateById = (id, newItem) => {
    let item = items.find(item => item.id === id);
    if(item) {
        item.title = newItem.title;
        item.seller = newItem.seller;
        item.condition = newItem.condition;
        item.price = newItem.price;
        item.size = newItem.size;
        item.details = newItem.details;
        item.image = newItem.image;
        item.section = newItem.section;
        item.totalOffers = '0';
        return true;
    }
    else {
        return false;
    }
    
};

exports.deleteById = (id) => {
    let index = items.findIndex(item => item.id === id);
    if(index != -1) {
        items.splice(index, 1);
        return true;
    }
    else {
        return false;
    }
};

exports.findBySearch = (query) => {
    let send_items = items.filter(include);
    function include(item) {
        return (item.title.toLowerCase().includes(query.toLowerCase()) || item.details.toLowerCase().includes(query.toLowerCase()));
    }
    return send_items;
}
