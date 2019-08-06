import store from '../javascript/localstorage/store.js';

const test = QUnit.test;

QUnit.testStart(() => {
    store.storage.clear();
});

test('get and save', assert => {
    const userID = { name: 'dylan31' };
    const key = userID;

    store.save(key, userID);
    const got = store.get(key);

    assert.deepEqual(got, userID);
});


