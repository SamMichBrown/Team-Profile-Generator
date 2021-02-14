const Manager = require('../lib/Manager');

test('creates a character object', () => {
  
    const manager = new Manager('Sam')
  
  expect(manager.name).toEqual(expect.any(String))
  
});

test('getOfficeNumber() returns office number', () => {
    const manager = new Manager('Dave', 123, 'sam@hotmail.com', 25)
    expect(manager.getOfficeNumber()).toEqual(25)
})

test('getRole() returns Manager', () => {
    const manager = new Manager('Dave', 123, 'sam@hotmail.com')
    expect(manager.getRole()).toEqual('Manager')
})
