function importImages(r) {
    let images = {};
    r.keys().map((item, index) => {
        return (images[item.replace('./', '')] = r(item));
    });
    return images;
}

function getLocalStorage() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    return cartItems;
}

function setLocalStorage(obj) {
    const cartItems = getLocalStorage();

    if (!Object.keys(cartItems).length) {
        localStorage.setItem('cartItems', JSON.stringify(obj));
        return;
    } else if (cartItems) {
        Object.keys(obj).forEach((key) => {
            if (key in Object.keys(cartItems)) {
                cartItems[key].quantity =
                    cartItems[key].quantity + obj[key].quantity;
            } else {
                cartItems[key] = { ...obj[key] };
            }
        });
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
}

function returnGameConsoles(images) {
    const gameConsoles = {
        ps1: {
            title: 'Playstation',
            imageSrc: images['Playstation_1.png'].default,
            description: 'First console released by Sony in 1994',
            price: 100,
            quantity: 1,
        },
        ps2: {
            title: 'Playstation 2',
            imageSrc: images['Playstation_2.png'].default,
            description: 'Second console released by Sony in 2000',
            price: 120,
            quantity: 1,
        },
        ps3: {
            title: 'Playstation 3',
            imageSrc: images['Playstation_3.png'].default,
            description: 'Third console released by Sony in 2006.',
            price: 140,
            quantity: 1,
        },
        ps4: {
            title: 'Playstation 4',
            imageSrc: images['Playstation_4.png'].default,
            description: 'Fourth console released by Sony in 2013',
            price: 250,
            quantity: 1,
        },
        ps5: {
            title: 'Playstation 5',
            imageSrc: images['Playstation_5.png'].default,
            description: 'Fifth console released by Sony in 2020',
            price: 500,
            quantity: 1,
        },
        // microsoft: [
        //     {
        //         Xbox: {
        //             description: 'First video game console released by Microsoft in 2001',
        //             price: 100
        //         },
        //         Xbox_360: {
        //             description: 'Second video game console released by Microsoft in 2005',
        //             price: 150
        //         },
        //         Xbox_One: {
        //             description: 'Third video game console released by Microsoft in 2013',
        //             price:  250
        //         },
        //         Xbox_Series_X: {
        //             description: 'Fourth console released by Microsoft in 2020',
        //             price: 499
        //         }
        //     }
        // ],
        Gcube: {
            title: 'GameCube',
            imageSrc: images['Game_Cube.png'].default,
            description: 'Fifth console released by Nintendo in 2001',
            price: 75,
            quantity: 1,
        },
        wii: {
            title: 'Wii',
            imageSrc: images['Wii.png'].default,
            description: 'Sixth console released by Nintendo in 2006',
            price: 100,
            quantity: 1,
        },
        wii_u: {
            title: 'Wii U',
            imageSrc: images['Wii_U.png'].default,
            description:
                'Direct successor to the original Wii released in 2012',
            price: 110,
            quantity: 1,
        },
        n_switch: {
            title: 'Nintendo Switch',
            imageSrc: images['Nintendo_Switch.png'].default,
            description: 'Latest console released by Nintendo in 2017',
            price: 400,
            quantity: 1,
        },
    };
    return gameConsoles;
}

function countStorageQuantity() {
    const cartItems = getLocalStorage();
    const itemCount = Object.values(cartItems).reduce((previous, current) => {
        return current.quantity + previous;
    }, 0);
    return itemCount > 99 ? '99+' : String(itemCount);
}

export {
    importImages,
    getLocalStorage,
    setLocalStorage,
    returnGameConsoles,
    countStorageQuantity,
};
