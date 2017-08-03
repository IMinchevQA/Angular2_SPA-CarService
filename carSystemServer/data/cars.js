// const cars = {}
// let currentId = 0
module.exports = {
  updateCar: (car, id) => {
    let updatedCar = {
      id,
      make: car.make,
      model: car.model,
      image: car.image,
      description: car.description,
      engine: car.engine,
      price: car.price,
      owner: car.owner,
      date: Date.now() + id
    }
    cars[id-1] = updatedCar
    return cars[id-1]
  },
  save: (car) => {
  let id = cars.length + 1;
  let cnt = 1
  let newCar = {
    id,
    make: car.make,
    model: car.model,
    image: car.image,
    description: car.description,
    engine: car.engine,
    price: car.price,
    date: Date.now() + id,
    owner: car.owner
  }
  cars.push(newCar)
  return newCar
  },
  sixCars: () => {
    return Object
      .keys(cars)
      .map(key => cars[key])
      .sort((a, b) => b.id - a.id)
      .slice(0, 6)
  },
  all: (page, name) => {
    if (name) {
      return Object
        .keys(cars)
        .map(key => {
          if (cars[key].owner === name) {
            return cars[key]
          }
          return null
        }).filter(a => a !== null)
        .sort((a, b) => b.id - a.id)
    }
    const pageSize = 3
    let startIndex = (page - 1) * pageSize
    let endIndex = startIndex + pageSize
    return Object
      .keys(cars)
      .map(key => cars[key])
      .sort((a, b) => b.id - a.id)
      .slice(startIndex, endIndex)
  },
  findById: (id) => {
    return (cars.find(car => Number(car.id) === id))
  },
  allReviews: (id) => {
    return cars[id]
      .reviews
      .sort((a, b) => b.createdOn - a.createdOn)
      .slice(0)
  }
}
let cars = [
  {
    id: 1,
    date: Date.now() + 1,
    make: 'BMW',
    model: 'BMW i8',
    image: 'https://www.bmw.bg/content/dam/bmw/common/all-models/i-series/i8/2014/at-a-glance/intro-design-ts-fw-01.jpg/jcr:content/renditions/cq5dam.resized.img.585.low.time1447950374210.jpg',
    owner: 'Bruce-Lee',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    engine: '2.8 hp',
    price: '52000',
    comments: [
      {
        name: 'Bruce Wayne',
        content: 'cool car!'
      }
    ]
  },
  {
    id: 2,
    date: Date.now() + 2,
    make: 'BMW',
    model: 'BMW Santa Maria',
    owner: 'Bruce Wayne',
    image: 'http://images.webmakerx.net/eVoxTransparent_src/main_png/9799_031.png',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    engine: '2.8 hp',
    price: '125000',
    comments: []
  },
  {
    id: 3,
    date: Date.now() + 3,
    make: 'BMW',
    model: 'BMW 118i "Fashionista"',
    owner: 'Maria',
    image: 'http://4.bp.blogspot.com/-3p7nZ5LNTHc/Vd8YrxNq3gI/AAAAAAAAIAc/saP4UEtmfSU/s1600/BMW-118i-Fashionista.jpg',
    engine: '2.8 hp',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    price: '38000',
    comments: []
  },
  {
    id: 4,
    date: Date.now() + 4,
    make: 'BMW',
    model: '2016 BMW 2 Series',
    owner: 'Bruce Wayne',
    image: 'http://www.bmwofflorence.com/assets/misc/12223/601785.jpg',
    engine: '2.8 hp',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    price: '78000',
    comments: []
  },
  {
    id: 5,
    date: Date.now() + 5,
    make: 'Mercedes',
    model: 'Mercedes-Benz C-class',
    owner: 'Maria',
    image: 'http://buyersguide.caranddriver.com/media/assets/submodel/7841.jpg',
    engine: '2.8 hp',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    price: '26000',
    comments: []
  },
  {
    id: 6,
    date: Date.now() + 6,
    make: 'Mercedes',
    model: 'Mercedes-Benz CLA-class',
    owner: 'Al Bundy',
    image: 'http://buyersguide.caranddriver.com/media/assets/submodel/7605.jpg',
    engine: '2.8 hp',
    description: 'The BMW i8 is a plug-in hybrid sports car developed by BMW. The i8 is part of BMW"s electric fleet "Project i" being marketed as a new sub-brand, BMW i. The 2015 model year BMW i8 has a 7.1 kWh lithium-ion battery pack that delivers an all-electric range of 37 km (23 mi) under the New European Driving Cycle. Under the United States Environmental Protection Agency cycle, the range in EV mode is 24 km (15 mi) with a small amount of gasoline consumption. Its design is heavily influenced by the M1 Hommage Concept car, which in turn pays homage to BMW"s last production sports car prior to the i8: the BMW M1.',
    price: '47000',
    comments: []
  },
  {
    id: 7,
    date: Date.now() + 7,
    make: 'Lamborghini',
    model: 'Gallardo',
    owner: 'Robert de niro',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzcxLzE0MDg1OTgvb3JpZ2luYWwvbGFtYm9yZ2hpbmktZ2FsbGFyZG8tYXV0b21vYmlsZS1tb2RlbHMtcGhvdG8tMT93PTY1MCZxPTUwJmZtPWpwZyZpMTBjLm1hcmsuaW1hZ2UudHlwZQ%3D%3D_$/$/$/$/$/$',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '250000',
    comments: []
  },
  {
    id: 8,
    date: Date.now() + 8,
    make: 'Lamborghini',
    model: 'Murciélago',
    owner: 'Robert de niro',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzcxLzE0MDg2MTAvb3JpZ2luYWwvbGFtYm9yZ2hpbmktbXVyY2ktbGFnby1hdXRvbW9iaWxlLW1vZGVscy1waG90by0xP3c9NjUwJnE9NTAmZm09anBnJmkxMGMubWFyay5pbWFnZS50eXBl_$/$/$/$/$/$',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '250000',
    comments: []
  },
  {
    id: 9,
    date: Date.now() + 9,
    make: 'Lamborghini',
    model: 'Batmobile',
    owner: 'Bruce Wayne',
    image: 'http://pop.h-cdn.co/assets/cm/15/06/54cfda2d86cb7_-_batmobile-75th-03-0714-de.jpg',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '450000',
    comments: []
  },
  {
    id: 10,
    date: Date.now() + 10,
    make: 'Lamborghini',
    model: 'Reventón',
    owner: 'Sylvester Stallone',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzQ3NC85NDY2Njg4L29yaWdpbmFsL2xhbWJvcmdoaW5pLXJldmVudC1uLWF1dG9tb2JpbGUtbW9kZWxzLXBob3RvLTE%2Fdz02NTAmcT02MCZmbT1qcGcmaTEwYy5tYXJrLmltYWdlLnR5cGU%3D_$/$/$/$/$/$',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '450000',
    comments: []
  },
  {
    id: 11,
    date: Date.now() + 11,
    make: 'Lamborghini',
    model: 'Estoque',
    owner: 'Arnold Schwarzenegger',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzE2MzAvMzI1OTQwOTYvb3JpZ2luYWwvbGFtYm9yZ2hpbmktZXN0b3F1ZS1hdXRvbW9iaWxlLW1vZGVscy1waG90by0xP3c9NjUwJnE9NjAmZm09anBnJmkxMGMubWFyay5pbWFnZS50eXBl_$/$/$/$/$/$',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '450000',
    comments: []
  },
  {
    id: 12,
    date: Date.now() + 12,
    make: 'Lamborghini',
    model: 'Estoque',
    owner: 'Arnold Schwarzenegger',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzE2MzAvMzI1OTQwOTYvb3JpZ2luYWwvbGFtYm9yZ2hpbmktZXN0b3F1ZS1hdXRvbW9iaWxlLW1vZGVscy1waG90by0xP3c9NjUwJnE9NjAmZm09anBnJmkxMGMubWFyay5pbWFnZS50eXBl_$/$/$/$/$/$',
    engine: '2.8 hp',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '450000',
    comments: []
  }
];
