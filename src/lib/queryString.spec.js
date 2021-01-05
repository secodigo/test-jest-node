const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid quey string when an object is provided', () => {
    const obj = {
      name: 'Rodrigo',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Rodrigo&profession=developer');
  });

  it('should create a valid query string even when an array is passed as values', () => {
    const obj = {
      name: 'Rodrigo',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Rodrigo&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Rodrigo',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Rodrigo&profession=developer';
    expect(parse(qs)).toEqual({
      name: 'Rodrigo',
      profession: 'developer',
    });
  });

  it('should convert a query string of single key-value', () => {
    const qs = 'name=Rodrigo';
    expect(parse(qs)).toEqual({
      name: 'Rodrigo',
    });
  });

  it('convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Rodrigo&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Rodrigo',
      abilities: ['JS', 'TDD'],
    });
  });
});
