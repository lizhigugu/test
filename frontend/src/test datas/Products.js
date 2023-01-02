const Products = [
    {
        "name": "bag",
        "_id": "00001",
        "category": "seventeen",
        "URL": "https://www.amax.hk/cache/img/7065a279aaaf7dee3418b38924ba90a4.jpg",
        "price": 500,
        "note": "截止日期提前到3/18",
        "product_type": "bag",
        "option_type": "顏色",
        "options": [
            {
                "option":"pink",
                "bought":"10",
                "sold":"5",
                "buyers":["ming","ric"]
            },
            {
                "option":"blue",
                "bought":"10",
                "sold":"7",
                "buyers":["ming","peter","amy"]
            }
        ]
    },
    {
        "name": "T-Shirt",
        "_id": "00002",
        "category": "seventeen",
        "URL": "https://teeruto.com/wp-content/uploads/2021/11/seventeen-svt-kpop-rock-bootleg-vintage-style-unisex-tshirt-p0zow97515.jpg",
        "price": 800,
        "note": "截止日期照常",
        "product_type": "clothes",
        "option_type": "尺寸",
        "options": [
            {
                "option":"M",
                "bought":"10",
                "sold":"5",
                "buyers":["ming","ric"]
            },
            {
                "option":"L",
                "bought":"10",
                "sold":"7",
                "buyers":["ming","peter","amy"]
            }
        ]
    },
    {
        "name": "Album",
        "_id": "00003",
        "category": "seventeen",
        "URL": "https://m.media-amazon.com/images/I/3177NvLTioL._SY580_.jpg",
        "price": 1000,
        "note": "我不知道專輯有什麼選項;_;",
        "product_type": "albums",
        "option_type": "type",
        "options": [
            {
                "option":"1",
                "bought":"10",
                "sold":"5",
                "buyers":["ming","ric"]
            },
            {
                "option":"2",
                "bought":"10",
                "sold":"7",
                "buyers":["ming","peter","amy"]
            }
        ]
    }
]

export default Products