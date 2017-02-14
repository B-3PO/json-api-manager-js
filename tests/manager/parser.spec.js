'use strict';
import parse from '../../src/manager/parser';
å
describe('parser', function () {
  it('should parse', function () {
    var payload = {
      data: [
        { id: '1', type: 'one', attributes: { name: 'item one' }, relationships: { two: { data: [ { id: '1', type: 'two' } ] } } },
        { id: '2', type: 'one', attributes: { name: 'item two' }, relationships: { two: { data: [ { id: '2', type: 'two' } ] } } } ],
      included: [
        { id: '1', type: 'two', attributes: { name: 'sub item one' } },
        { id: '2', type: 'two', attributes: { name: 'sub item two' }, relationships: { three: { data: [ { id: '3', type: 'three' } ] } } },
        { id: '3', type: 'three', attributes: { name: 'sub sub item one' } } ] };

    var parsed = parse(payload);
    var root = parsed.root;
    var types = parsed.types;

    expect(Object.keys(types).length).toEqual(3);
    expect(Object.keys(types.one).length).toEqual(2);
    expect(Object.keys(types.two).length).toEqual(2);
    expect(Object.keys(types.three).length).toEqual(1);

    expect(root.length).toEqual(2);
    expect(root[0].id).toEqual('1');
    expect(root[1].id).toEqual('2');
    expect(root[0].name).toEqual('item one');
    expect(root[1].name).toEqual('item two');
    expect(root[0].two.length).toEqual(1);
    expect(root[0].two[0].name).toEqual('sub item one');
    expect(root[1].two[0].three.length).toEqual(1);
    expect(root[1].two[0].three[0].name).toEqual('sub sub item one');
    // expect(root[0].two[0].three.length).toEqual(0);
  });
});
