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
      comments: car.comments,
      date: Date.now() + id
    }
    cars[id-1] = updatedCar
    return updatedCar
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
  },
  createComment: (commentBody, id) => {
  let commentCar = cars[id-1]
  let commentId = commentCar.comments.length + 1
  let comment = {
    id: commentId,
    title: commentBody.title,
    content: commentBody.content,
    author: commentBody.author,
    createdOn: Date.now() + id
  }
  commentCar.comments.push(comment)
  return commentCar
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
    make: 'Audi',
    model: 'TT',
    owner: 'Bruce Wayne',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Audi_TT_Coup%C3%A9_2.0_TFSI_quattro_S-line_%288S%29_%E2%80%93_Frontansicht%2C_3._April_2015%2C_D%C3%BCsseldorf.jpg/420px-Audi_TT_Coup%C3%A9_2.0_TFSI_quattro_S-line_%288S%29_%E2%80%93_Frontansicht%2C_3._April_2015%2C_D%C3%BCsseldorf.jpg',
    description: 'The Audi TT is a small 2-door sports car marketed by Volkswagen Group subsidiary Audi since 1998, assembled by the Audi subsidiary Audi Hungaria Motor Kft. in Győr, Hungary, using bodyshells manufactured and painted at Audi\'s Ingolstadt plant.[2] This changed with the third generation model that uses parts made entirely by the Hungarian factory.',
    engine: '3.2 V6 quattro',
    price: '125000',
    comments: []
  },
  {
    id: 3,
    date: Date.now() + 3,
    make: 'Lotus',
    model: 'Exige',
    owner: 'Maria',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxtNP2zd3jxudsEYJvryF46JkwclNv6l8tFBF5lTbeRtxaAI0O',
    engine: '3.5 litre V6',
    description: 'Exige V6 Cup is a race car version of Exige S for track or road use. Exige V6 CupR is the race-only version of Exige V6 Cup. The Exige V6 Cup is offered for sale new in the United States as a track only car. If purchased, US Lotus Dealers will only provide a bill of sale instead of a title.',
    price: '1000',
    comments: []
  },
  {
    id: 4,
    date: Date.now() + 4,
    make: 'Alfa Romeo',
    model: '8C Competizione',
    owner: 'Bruce Wayne',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/AR8C-Competizione.jpg/420px-AR8C-Competizione.jpg',
    engine: '4.7 V8',
    description: 'During the Mondial de l\'Automobile 2006, Alfa Romeo announced the production of a limited series of 500 units of the 8C Competizione. The production version is very similar to the concept; the biggest difference to the exterior being the rear-hinged hood.[9] Other minor changes included the front lights, which used Xenon lamps, a standard wiper system, a mesh side vent, and the rims, which had a design that mimicked the cloverleaf logo.',
    price: '150000',
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
    make: 'Ferrari',
    model: 'LaFerrari',
    owner: 'Al Bundy',
    image: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBUQEBMWFhUVFRUVFRUXFRUVFRUVFRUXFhUVFRUYHSggGBolHRUVITEhJSktLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGisdHR8tLS0tLS4tLS0tLS0tKy0tLS0tLS0tLS0rLS0tLSstLS0vLS0tLS0tLS0tLS0tKy0rLf/AABEIAK4BIgMBEQACEQEDEQH/xAAcAAACAwEBAQEAAAAAAAAAAAACAwEEBQAGBwj/xABEEAACAgEBBQQHAwoFAgcAAAABAgADEQQFEiExQQYTUWEUIlJxgZGhMrHwFSNCU2JyksHR4QcWwuLxk9MkM0OCorLS/8QAGwEBAQEBAQEBAQAAAAAAAAAAAAECAwQFBgf/xAA/EQACAQICBQoEAwcDBQAAAAAAAQIDEQQhBRIxQVETFGFxgZGhsdHwIjLB4QZCUhUzQ2KS4vEjotIkU3KCwv/aAAwDAQACEQMRAD8AyQJSBBYAQWAGEgBqkAYK4AwVwA1rgBiqAGKoAYqgBiqAEKoAQqgEiqAF3MA7uYBPcwCe5lAQpkAQpgBCmAGtMAYKYAYpgDBTADFMFJ7mQE9zAI7qAQaoAJrgAGuAAUgAFYAJWADuwDyQWUgYSAMWuAMWuANWuAMWuANWqAMWqAMWqAGtUAYKYAYpgBCqAEKoBIqgXCFUAnuoBPdQLk91BLkiqChCqAGKYAa0wBq0wBi0wAxRADFEFC7iQHdxABNMAFqYAtqoAtqoApq4Atq4AspAB3IB5Na5SDVrgDVrgDVqgDVqgDlqgDVpgDVqgDFqgXDFUEuGKpRcMVQAhVAJFUAIVQCRXAJ7qAT3UAnuoAQqgBCqAGtUAatUhRq0wBq0wBi0wAxTIULuYB3cwATTAAamAKamAJamAKaqAIaqAKauAB3cA8qtcpBq1QByVQByVQByVQBy1QBq1wS4xapQMWqAGK4AYrgBCuAEK4BIrgBd3AJFcA7cgE93AJFcAIVwAhXAGLXAGrXIUctcActUAatUAYKZChimAd3MAE0wAGpgCmpgCXpgCHpgCHpgCWqgC+6gHlVqlIOSqAOSqAOWqBcatUpBq1wBq1wBgrgBiuAGEgBBIAQSATuQCdyATuwCd2AduwCd2ASFgBBYAYWAMVZANVIKhyrAGqIA5RAGKJCjAIAQEA7cgAmqALamAJemAIemAIemAIemAB3MA8otUpBi1wS45a5QNWuANWuANWuAGEgDAkAIJACCwCQsAndgE7sAndgE4gAW2KgyxAHmcRcqi3sKlu00AyASPaOEX4M5GfhmYc+CO0aK/NJLvfll4mbqe06Lywfdk/fu/SZ1pvgdNTDLa5PsS+rKjdslH6BPxC/1j4+gl8PwfvuFt23H6tv+on/bk+Pj77jaeG3xfv8A9gG7dL0rfP79Z/0TL5Xo99h1i8FfNPu/vGr2+r612jzDVn70mXKrw8UdY0sC/wA6XXGf0bLFXbWtvs2MD4OiH6grOUsRKHzXXWj3UdF0K9+TcZW/TJ37ncM9vFrO66q3ju5X78zcK85fluca+jMNTdnV1Hwdn6Gps7tzo7Tus5rP7Q4fMfzxOqrL8yaPDLR03+6lGp1NX7meo01yuoZGDKeTKQQfcROqaayPFOEoS1ZKz6R6wZGCAEIAUA6AdiACyQBT1QBL0wBD0wBfcwDyK1TRkatcAYtcAaqQBipADCQAwsAILACAgE4gE4gHYgE4gAW2Kg3mIAHU/jnDZUm9hk6zbHDKncTo7DLNj2E6/H44mHI2opdJjW612OVG7+2/rWH3A8F+HEeJksGynaVJy2WPVmJYn5y2JcydrW1qvLBPLH45SkMU2kgkchwz5zLZpRK1lx8Y1iuJXbUHxmjAHf8AjAGaV95/L+v/AAZ4sbmowW9+/M/TfhpKE62IlshH7/8AybKr/f3z1RslZH56pKVSTnLa3dhMnQ8ffNXOdhGo2nq9F/4jRWshX7ac0ceJU8OExqLasn0HpjiqiWrP448JZ9z2rsZ7fsT/AIxU6krTrU7mw8A6gsjHzHMH5/CRzcfm2cTpHDwru1DKX6X9HsfU7PrPqGi1ddyb9Th14jKnIyOBB8CPCdIyUldHlq0p0patRNPpLIlOZMA6ATAOgHQASsAW1cADuoB4oTRkMYgBgiAMDCAEGgBBxACDiATviAT3ggE94IB3eQCvrto1UIbLXCqOp/kOZPkJmdSMFeTO+Hw1XET1KUbv3t4GZpe1dFwY0bzFSBxUqDnkd49Pr5TnCvGd9U9GK0bVwrjyrWfB3fd7XSUdbrSW9f17Oickr/eHT3c/E8MTW08reVlkihY/Hec7zeJ5DwCjoJbGblTU6wDmQPecSkMvUbXQdc+6S5bGDrtYbGLfADwEly2ELYep4eEy8zcchVlueUKIchRzN3MWIkzGRe2SvU/jPDH3zxT+PEJcD9PRXNtDSlvqvwbt5LxNkGes/Nsaiknp8SAAPMngIcklm7HSlQq1patOLk+hDfRWIPAMOu6VcY653ScRGpF7GjVXBYin89OS7GYmw9ipRf3xzzPdgjgM8m8c4njxVdZRR+i0JoyUU69RWexX4b30X2dV+J9K7Kl67O8qs3N77YPrVv4by5HEeIIPnjhMUW07p2O2klCpDUqRvbZxXU/o7o9DtHt1Rphu2WK9ns1oeHvJYgfX3T0TxUYbXd9B8qhoKviHeEXGPGT+yuYNn+KIJ4KR8AfvnDn3QfTj+F2lnJMsaL/EzNqLZWprdgu+uVZcnG8QTg468puGNTkk12nnxH4bnGEpU3mle3ofR57z8sdAOgHQDoBGIB83FvmPnNGAhd5j5wAhd5j5wAhd5j5wCe/8x84BPf8An9YBPf8An9YAvUa5a13nYADz+gHU+UzOcYLWk7I7UKFSvNQpq7ZnP2lT9Hj5nhPDLSEfyo+9S/DlW16krdC9fsMp7QqemfiZFjWztLQMIraze2f+d4upRfaJIJ9wP38p6IVZPbkfMr4KlDKDuzJ7T7AXVIE70eq28Djj1BHyPPyHunKt/qJJ7j26Nk8JKUoJ/ErZ5rr3FGrZj0193T3a45HLZHiR+0erc/dCqOKsku8zUwca03OpUk2+hepm2bN1AGFase5j/SOcS4eP2ItE0n/Ef9H9xQ1Gy9UeZU/+8/0k5zL9Pj9jf7Fpf93/AGf3GfbsLUeyv8Q/rJzr+XxL+w47qy/pfqVz2d1J5V5+K/1lWJ/lfgR6ES/jR7pegQ7I608qf/mn9Zvl/wCV+HqcXopL+ND/AHf8RV/ZbVp9tEXPLeurBPuGeMcultT8PUytFVJfLOL6tf8A4Cquz1rHBepfNrOHyAJ+kixNPj77yy0Lilss+q/1SNWjsSzD1dVRnw/OY+e7NqtF7GYei6kfnuuy/wBUUNqdjNXQN4qrr7SHeX49QPMiHWcc3F26MzcNEKrlTqxvwknF/VAUbFvNKsigje4HvKx9nKjGW8SflPPhnZyqS3n2NM4ec6dLDUVlDb3WXgWdQrVDNm6pHNS2TnwGMzq8RCJ8qloPFVP0pdf2Mh9U9pIRS3kE38D5E/GeSTlN3Z+kw9KhhKXJQu+L4vs8PbO0uztUWBrqdSCCCw3QOPPDf0jU4m3XeyNz3SbIuvw9mC5ALFVCqW64UAAD4Suk5O5zji4UYKN9nb5mRtvar0oK6rEwwJJRt5wOW63s8j5zlJtZI9VCnTm3UkndcdnX0nlDaZnVPU6zZG/4cfDzPQTUYNuyONXExpQc5PJZkanX3Ut3dliMmQGVXLGs9N8Hh5ZHKeupg/gyeZ+ewn4i1sT8cUovY9662fpXZG2Es09NhdQXqrY5YZyyAnM9sHeKfQfmcVBU69SHCTXcy3+Ua/1ifxCaOFzvyjX+sT+IRYXO/KNf6xP4hFhcIa1PbX+IQAvTE9pf4hAPB/5cq8JowSOzlPhAJ/y5T4QAv8uU+ECx3+XKfCAT/lynwgWMHtQ+m0QChd+1hkJ0A9p8dPLr9Z5sRiFSWWbZ9rQ+h5Y+bberCO1/RdPkeF1Orew7zH3AcAPIAcp8epUlUd5O5/RMLgqGFhqUo2Xi+t7zU2VsK2zDOe7TxP2j7liNHW25HnxOPp0/hgtaXh3nqtGaNMPUGW9puJ+Hh989MdSnsPiVY1sQ/jeXAnUbfHMt9YdYsNH8EZOo7VryXJ8+OJyliHuR7oaKe/IpWdpCepmHWkz0R0akJPaA+czykjotHoA7ePnHKSNcwRo7P1FlnJWPuBP4HnN03KW48deFOntaNZb3XAJRSeQ/8x8+SJz/AIhO6ust58+ai05Wdlv2LvfoTZrkXPe2WHALFVOCFVSzHdrwd0KpJyT9RPXCg3nLI+JiNJU4O1FJvjbLx29iR5vbu26ge7RU4Fc7oVlcFd4tvKR6wJA4+yeM51Z0krRSfl9z24LCY6o1UrVZU1wWUu78q68+jeebN+Sd0cM9fCeGUd5+soVbRUVnbe234ss6bV7nrFyoHPHM+QHjJCm28iYrEUoQbkl2/V8C63a/aDru6Wp9weyqu7eeGyxP7oA8p9KNGrbbY/HVNJ4NVG9Vz6di7F6i9gdphY7pb6qvlbV3ACjHI393oR1xjPHqBPDiqdSB9enWpY6ip4dtVKeaTef/AIvinuMzWPvN6zk8QM55qDy8ZIN7T6VaCnHg+g3NP2npoG7Rp+H7TBfiQM59+Z2U7HhdFvK9g27c2/o00j3hz/qEvKvggsJDfJ+HoOq/xE1C/wDp0/wv/wDuVV5rcjnLR9CW+XevQqbW7WLqQe80tOTxLLvq2R1PHjzMzOevtR0oYfkX8M21wdjzVlgzw4fWc0j0yqLcBXqArhiThQznHPCjpnrxyPMT14WHxN8D8/p3EWpRpr8z8F97Fzb9avpdKyqgLabeO6oXDd7ZvjPM+ow55PqCe4/LH3fsBs+q7ZeksZfWaivPvxj+UzDJWOuIlr1HN7Xn3o3/AMi0+wJu5xsT+RafYEXFjvyLR7Ai4sCdhUez90XFgfyDR7P3SXFkZOZohOYBOYBOYB2YBi9p+0aaKk2nix4VoMFnPLIHgPH+QmJTSV3sPRTw85yUIJuXDh78D5jtTXtq72fdYE4GGHHkDwPUceZ858nGSU5prh9Wfvfw9SeGw1SNTJqWf9MSzpe50/rPh7OnVVPkOp855lJR6WfTqcrXyj8MfFkarbztyhzkxTwEI7TPt2i5/S+UzZvad1Tpx2IrveTzOZdU2pRWwjfixrXO3osXXL2n2cWG9Yy1r4ucH4Lz+6VRPPUxUY7FrP3vH1bT0NJwn55x+k3BAfh/eeqnh5PZHvyPg4vTFNZTqpdEPiffsXejSbbG/WWNjMq8qqAFycZ3cn5cB7uM9Swrfzy7EfDqabhH9zSz4yd33L1YjT65e6stZ0oxvKFUiy52C2ABlJ3sb6r65OMHhznX/TorJW8zxLnmkp2bbS7IrsWXcrmBtXa/eE90O7UsSASGZcolZU2AAsMIOB4cTwnkqVpVMti4H6LCaNo4Vay+Kf6nu6lu8+kyAQDknP3TnnsR604p6zd2EdR4Saht4l7EI1errUDf3rG592hKgeHeMOPwGOnHpPdh6SS1j8vpjHSqT5FPJbel/bz6jd2jToVXShdP3bX6Wu4Mt9wffZrFO4bGKFvUHA4HHrnE9J8Moave30Z37zJ3aryN2wkc9PqM/pcOBPEEeGQOdWGvBo9uj8U8NiI1Fs39Qq+0Z4DHLx5+PGfMUT9tKrm87ldrptRPPKuAb5rUObxBHfxqGecEekRqE5ySLCfx/OXUJy9zqmrLlLiwV1CBkwxVmbIJGeI9XBHnPXQjaJ+f0rV16yXBeefoevo2Y4rCbrFBTuV+rkMprexrd4gDdHrjhxBGOhM6pp7D5jPt3YGru9laJDwI01JI8CUDH74RqW3M396UydvCAdvQDt4QDt4QDxnfTRknvoIT30A7voAvVbUXT1ta3QYXw3zyz9T8JxrVVTjc+jo3BvFVdVbvL35nzjX7eyxZVy3IMeJAHDAJ4gcBPj1K8pH77C6Jp01krX29JiXa1yxYtkngfd4e7jOWb2n0eTpwySKr3fD5/wA5rVJyrQek15qffAUkZxvLvAHxweohwTPNiLVoOEm7PbZ27BWo1bWMXclmY5JJySZrVEHGnFRirJACwdZdUvLEd6JNUqrIIXt+i275gAt8CeA+UqSW1XOdRzmrKequhXfjdeApdElrgWuzZI9Z34DPXynenWmnaCUew+XitHYZwlOvKpVtna/kkki1tUaamvutKhd/0ricfBVPIfU/QfQVSMVnK/voPyVTCVqs706Lgtyz85bStoNs3VVlAV5DACjAKhl3uPNsMRn3+M5TxH6T24fRDVnWfYvX07yh3k8zV82fchJQiowVkuB2CZMkatORIq8ZNY2qL3j9NRvMFHX7hxM1Ba0kjliZqhRlU4Lx3eIW9VUdw8OPgT8/OfTPw7bbuzd7T7Hr9H2ONSd1baCpYc1DV1shPkGsU/GCGXszRWXGzSWq2/uslhKtwZAGpuY9CV4HPPdSAZFlhYBjzI9b94HB+oz8Z4qsUpM/TYGrKpQjfdl3fYUQZk7tMHdMXJqsgqZbmHBg7xH/ABmaOTyJN3q4IGfaOSfdzwIM53vcXp9Uy2q6MVZSN0jmPWK/6p6oK0UfDxE9arJ9J9W2JtTfTVKxBatGAJ5m2+tdIAo5D85aw4DBznmcnRxPrtDhEVF5KoUe5RgfdAbvmN9IlId6RAO9IgHekQDu/gHiBqZTJI1EAIXwCe/gHnu3uvsr0Ratd5Q695wzhMMN7yAJHHznnxNPlEon1tEYtYWc6trtL6pfU+Z09oinLI9xIH9DPFzKS2M/SL8S0J/PDvX+Q7Nvo/NV+CIP/riZeGmdY6bwj499/NivylWfwf7ychNHX9qYaW9+P3O9MrPU/P8AtHJSHPqD2P33B131nmzD3BW/mI1JB4qm9j8Rxaj9ZZ/01/7karHL+7ldnXoSfeoH841WVVY8X77SN/3/AC/vFi8p1++0EmLGG294S4gqSO3QZLm9VPaGtYkbOkaa3IPdmbnTUIKy3I4lvZG1F0lnevSly4Ksj7w4HqrD7LcOeDzPCevCq8mz89p+pq0oQW9+X+UegGr2FrQNyqyq5jgoXcYJxlg530cDOd3CnAOJ7j8qX9u7Mp019V16PqdFVhW72z7DugStKlVlzkVU+qARurknx82FxMcRDXisvfvrujc4ODsye2W1X1Vg0GnRaalfTruKoXeezUvSe8xwKkKGx58c8x6TB4K7Sbl11Z513WJ8jg/XM8OKlaS6j9ToClr0Z3/V9ELsRV4kgTzpt7D7NSFOmryaRSt1qj7Iz58hO8aUt58urj6S/dq/l77is15bx+HAfEztGnwPmVcbf5n3C+I44m+TZ5Vi4p3R1uoA98ipM6Tx0LZXE6DVd3ar8wDx5cuvMH7jO58o+ldlbqLb6hSv5uuwX2MQN7eUfm6i2Tveviwkk5K54cAAPqde1MzRkeuvgDBrYAXpkWBPpcWBPpUC54xbPOUgxbPOQDBZADDwClt/Trfo9RU2fXqYLgFvXGGTOOQ3lXjOVaSjHM9+j8POtUajwafamu/f2Hwpc/ZHMcCp4N8Ohmk01dHlnCUJOMlZoYcrxbCnzIJ+Q4ymTS09y2rnHEHHLn5gQLhavSd3Y1TruuuMjwyARy8iJNVG1UmtjZn6oFRkEzOpHgdFiqy2SKS6x+WfoJOSjwOqx9dfm8EOGrs8RJyMTotJ11wDGvs8F+szzeJ1jpesty8fUMbSf2R85nmy4nVaaqLbFd5f0Oo7wEkYwcTz1qeoz7WjsZzmLla1mXVE87PqxQwCZO6RMGgWMpzkyrq7wox1/GP5/Ke/CL4WfkfxBK9Wmuh+ZPYfQNbra1JwinvXycLu1jOT5DhkHmJ6z8+eh2drtLqb7NPYm6ttY09bjCi4KqjLoAFFxZBYjDHrAKefEC9s/aLLrPSdSMbt3ePjODToa2UNk9GtfIPXdMA8Qmutt3yq5ayxrHYAk5Y5IyeAH1nnqUlOV2fYweOlhqGrGVru/Tw+gl9Jg5tsUHwzvt8Z0jTseWrjHN329YOKx9lS3mZtRSPLKrKW1ja6HfgB8hKczS0vZyx+LDHv/GZbEua1PZCs/bwfhFhc0NP2R0g51hvfnHyEtiXPR7P0ddK7taKg8FUAfSAaCPAHJdBBq3QBg1EFJGpgE+kQDzK3+cEGLdKBgvkALa5RzYQCrrdpKyMq2MpIIBXI5+PiviDzmJwU1ZnpwuJnh5qcPHYeB2joGc5tpD/t1sA2PiP6zyxw86fyS7z7VXS+FxS/6mjnxi8/oYt2zqweDWp5OgP3GddaqtqTPFyWAn8tSUetX8gaaSn2bFP8Sn6iOVe+LMvA03+7rQfXdFjXai66zvXKs2FXIYclUKM5PE8Mk8yST1l5aG/LsI9GYj8urLqkvVFd1s57hPwyPjiXlYcTnLR2KX8N+fkVWrHPumHxP8xNa8eKOLw9ZbYS7mCR+w/z/wBsay4k5Gp+l9zIx+y3z/2y6y4k5Gp+l9wSVMxwEb5/7ZlzitrOlPC1qjtGD7ja0On3V3eHmSQBn3nE8FWevK5+twOHWGpKG/f1l5qwpwWUn9khh/EOHyM4tM+nSlGW8neUecxZs9OtTj0gNZKonOVW4trAOZmkmcJVIrazP1eoTfVWPBgQSOa8QVYDqQfngjrPdhk0nc/K6cnCc4OLu7P6fc19NpNRVQ3o9TahrvUZqFd1Fa8ceqCfWJ8OQInqPhlGvs/rLrFD1tWTxSsD86T0IrzvDjj1mwB49IBr9pNsstT6HCWahyg1OoU72Vq4ikdB6zEvjhnI6wDz9OiscYySPDJx8uUthc0tLsAnmQPrFiXNjS7FrXmM++UmZrafTKvIAe4CC6rLtdQkubUB4A84uXVGV5z/AMSnJosg+f0gge/ACF0A7voBIvgE9/5wDvSPM/SAYG9iAIs1uOAgFdrmbmTBQQpgAupkKZ+q07nrAMfU6F/OQpRfSsPGAJatvwBAA9YdB9RI4p7jpGtUjsk+8P0qwci3Dl6x4fAzDowe49ENIYmOybJbXueZz8FMxzemd1pfFb2n2A+mn8CTm8TotMVt6RHphjm64l/a8t8fH7HDWeUnIdJpaWW+PkMG0jy44PMZAHymebdJ1WmopfK/D1O9OPh9ZebdIem+EWC2rc8ppYdHGemaj2LxFM7noZtUYo8s9I1ZFW3T2Mc7pnRK2w8dSpKbvI19hbV1ulOaA37rIrqfejgqT54lMG1rdv7U1KGvIqQ81qSqgH97ulBPuzLYlxezNjCsccZ69fwINJNmvVpwIuFAuV1SXOipjlSS5tQQ1QZLm9VDkJ/Ai4sNUnylMtINGM2eeSDLmDB2/wCcEINsAg2QCDbAI76Ad3sAoqSecAk6RWgAnZx6QUj0Rh0gpHdnwkBBqzBSDpQekEFvs5T0gFazYynpAKtmwVkKVrOz0oK79nzJYCG2A0WAttgtLYAHYTxYlyBsJosLjq+zzHoYsLlurs4estiXL+n2Eo58YFy2uzFHICCBrpPKAMFIx9mADuqIZqLsxiqs5s9kVcYEHl9JDdhiCAOUSkGhoIdvSmGTvzSOEiS8pzI34IQXgAF4AG+OsAE2+cAHeMAVXbALNdkAtVvBSwjQB6AHoJDQY06nmogE+gVn9GASdlIfGACdjDoTBBbbF/agCm2KfaHygCzsTxb6Sgj8jL1J+kA78koOhPxgWIOzkH6IgWO9EA6ARcuoA1AkuaVMWyAdJLmlTBIi5vk0JeVHGasLyTKcyCh8YB3d56QaRwoA6Tm0eunLIIVyHW4wKekpm4QSCXCCwZuSJTLZGZo4yIJlMAloMgloAp7DAFb8AgtAB34AuswCzWYKWq2gFqt4BareQ0WKzAHpALCtADDwAt+AQzQBRMAVZiUCWYQUSzCRm0hDtMnRIQ7HwkOiQrfPhIUEt4j75SMWQPCbR56iOVBKcGduwDjiDSCQfgzLPRBhAfGZsdLhbwlJcgkQZuCbAIJcE2ymWAbJTmwGslMi2tEGQGtgCmeAAXgEF4B3ewUhGgD0aQpaqMAtVPALKWQUelkAclkAaLYA0WwDhbAJN8AU18AU1sASzwVCnaQ2hTCQ6JgkSGrgnMFuDuwRsEqJtHGYB98pyYO9BCDZBUQLRMs7RINshu4JtgXANsEANspADb5wZYJulMME3ymRZuggBtgh2/AI3oB2YKRkwCVaQo9HgDktgFhLIBYS2CjkugDlugDRbAD76ASLIBBeACbIAtjAA3oBBeQ2gd7ykNXINggtwDZBbgl5SXFWWSo5yEs8pgA2QADaYKQbZlm0wTZBu4BsgXA3oJcgwS4DOZTLYBcwZB3pSAloITmCEiASILY6QWJgotWgDFaAWKyYA9IA5TBRiNAGK8AYtkAYLIBItgB95AIJgAEwAS0AEvBUKNkhoA2QaALwLgF4I2JewiUwxbWSkB38wQ4PIUgueUFQBMhu4BMC4YslMgkwDoMgmAAwghBEoOAglicwUnMgOgE5gH//2Q==',
    engine: '6.3-litre, V12',
    description: 'LaFerrari is the first mild hybrid from Ferrari, providing the highest power output of any Ferrari whilst decreasing fuel consumption by 40 percent. LaFerrari\'s internal combustion engine is a mid-rear mounted Ferrari F140 65° V12 with a 6.3-litre (6262 cc) capacity producing 800 PS (588 kW, 789 bhp) @ 9000 rpm and 700 N·m (520 lbf·ft) of torque @ 6,750 rpm,[1][2] supplemented by a 163 PS (120 kW; 161 bhp) KERS unit (called HY-KERS), which will provide short bursts of extra power.',
    price: '1000000',
    comments: []
  },
  {
    id: 7,
    date: Date.now() + 7,
    make: 'Lamborghini',
    model: 'Gallardo',
    owner: 'Robert de niro',
    image: 'http://tu9srvbirvvtmjqkaw1naxgucmfua2vylmnvbq00.g00.ranker.com/g00/2_d3d3LnJhbmtlci5jb20%3D_/TU9SRVBIRVVTMjQkaHR0cHM6Ly9pbWdpeC5yYW5rZXIuY29tL25vZGVfaW1nLzcxLzE0MDg1OTgvb3JpZ2luYWwvbGFtYm9yZ2hpbmktZ2FsbGFyZG8tYXV0b21vYmlsZS1tb2RlbHMtcGhvdG8tMT93PTY1MCZxPTUwJmZtPWpwZyZpMTBjLm1hcmsuaW1hZ2UudHlwZQ%3D%3D_$/$/$/$/$/$',
    engine: '5,0−5,2 Liter, V8',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '250000',
    comments: []
  },
  {
    id: 8,
    date: Date.now() + 8,
    make: 'Bugatti',
    model: 'Chiron',
    owner: 'Robert de niro',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/FoS20162016_0624_132444AA_%2827785299372%29.jpg/465px-FoS20162016_0624_132444AA_%2827785299372%29.jpg',
    engine: '8-litre, W16',
    description: 'Like its predecessor, the Veyron, it has a carbon fibre body structure, independent suspension and a Haldex AWD system.[10][11][12] The carbon fibre body has a stiffness of 50,000 Nm per degree.[13]. The Chiron can accelerate from 0–97 km/h (60 mph) in 2.4 seconds according to the manufacturer,[4] 0–200 km/h (120 mph) in 6.5 seconds and 0–300 km/h (190 mph) in 13.6 seconds.',
    price: '2000000',
    comments: []
  },
  {
    id: 9,
    date: Date.now() + 9,
    make: 'Lamborghini',
    model: 'Batmobile',
    owner: 'Bruce Wayne',
    image: 'http://pop.h-cdn.co/assets/cm/15/06/54cfda2d86cb7_-_batmobile-75th-03-0714-de.jpg',
    engine: '6-litre, V10',
    description: 'The Lamborghini Gallardo is a sports car built by Lamborghini from 2003 to 2013. It is Lamborghini"s best-selling model with 14,022 being built throughout its lifetime. Named after a famous breed of fighting bull, the V-10 Gallardo has been Lamborghini"s sales leader and stable-mate to a succession of V-12 flagship models—first to the Lamborghini Murciélago, then to the current flagship Lamborghini Aventador. On November 25, 2013, the last Gallardo was ..',
    price: '450000',
    comments: []
  },
  {
    id: 10,
    date: Date.now() + 10,
    make: 'Mercedes',
    model: 'SLS',
    owner: 'Sylvester Stallone',
    image: 'https://everydaycarsdotorg.files.wordpress.com/2014/12/img_0508.jpg',
    engine: '6.2L V8',
    description: 'The Mercedes-Benz SLS AMG (C197 / R197) is a front mid-engine, 2-seater luxury, limited production supercar automobile developed by Mercedes-AMG of German automaker Mercedes-Benz and was the first Mercedes-Benz automobile designed in-house by AMG.[2] The car, which has gull-wing doors, was the successor to the Mercedes-Benz SLR McLaren and was described by Mercedes-Benz as a spiritual successor to the Mercedes-Benz 300SL Gullwing.',
    price: '450000',
    comments: []
  },
  {
    id: 11,
    date: Date.now() + 11,
    make: 'Porsche',
    model: '991',
    owner: 'Arnold Schwarzenegger',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Toulousaine_de_l%27automobile_-_7425_-_Porsche_911_Carrera_%282011%29.jpg/420px-Toulousaine_de_l%27automobile_-_7425_-_Porsche_911_Carrera_%282011%29.jpg',
    engine: '3.8-litre V8',
    description: 'Porsche revealed basic information on the 991 Carrera and Carrera S on 23 August 2011.[44] The Carrera is powered by a 350 hp (257 kW) 3.4-litre engine. The Carrera S features a 3.8-litre engine producing 400 hp (294 kW). A Power Kit (option X51) is available for the Carrera S, increasing power to 430 hp. ',
    price: '300000',
    comments: []
  },
  {
    id: 12,
    date: Date.now() + 12,
    make: 'Jaguar',
    model: 'C-X75',
    owner: 'Arnold Schwarzenegger',
    image: 'https://thedrivenblog.files.wordpress.com/2015/02/78845jlr.jpg',
    engine: 'Electric motor 582kW',
    description: 'Jaguar C-X75 is a hybrid-electric, 2-seat, concept car produced by Jaguar in partnership with Formula One team Williams F1 which debuted at the 2010 Paris Motor Show. The C-X75 concept produces 778 horsepower through four YASA electric motors,[2] each of which drives one of the four wheels.',
    price: '1115000',
    comments: []
  }
];
