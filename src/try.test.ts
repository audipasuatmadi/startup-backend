import {myFunction} from './app'



it('should test', () => {
    const value = myFunction(1, 5)
    expect(value).toEqual(6)
})