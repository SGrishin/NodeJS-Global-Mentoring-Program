import { UserController } from '../userController';
import { logInfo } from '../../log/logInfo';
import { logError } from '../../log/logError';

jest.mock('../../log/logInfo', () => {
  return {
    logInfo: jest.fn(),
  };
});
jest.mock('../../log/logError', () => {
    return {
        logError: jest.fn(),
    };
  });

let fakeGetAllUsers = jest.fn();
let fakeCreateUser = jest.fn();
let fakeGetUserById = jest.fn();
let fakeEditUserById = jest.fn();
let fakeDeleteUserById = jest.fn();
let fakeAutoSuggestUsers = jest.fn();

const mockedUsers = {};
const mockedUser = {};

class FakeUserService {
    getAllUsers(...args) {
        fakeGetAllUsers(...args);

        return mockedUsers;
    }
    
    async createUser(...args) {
        fakeCreateUser(...args);

        return mockedUser;
    }
    
    async getUserById(...args) {
        fakeGetUserById(...args);

        if (args[0] === 'userId') {
            return mockedUser;
        }

        return undefined;
    }
    
    async editUserById(...args) {
        fakeEditUserById(...args);
        
        if (args[0] === 'userId') {
            return mockedUser;
        }

        return undefined;
    }
    
    async deleteUserById(...args) {
        fakeDeleteUserById(...args);
        
        if (args[0] === 'userId') {
            return mockedUser;
        }

        return undefined;
    }
    
    async autoSuggestUsers(...args) {
        fakeAutoSuggestUsers(...args);
        
        return mockedUsers;
    }
}

class RejectFakeUserService {
    getAllUsers(...args) {
        fakeGetAllUsers(...args);

        throw new Error('test');
    }
    
    async createUser(...args) {
        fakeCreateUser(...args);

        throw new Error('test');
    }
    
    async getUserById(...args) {
        fakeGetUserById(...args);

        throw new Error('test');
    }
    
    async editUserById(...args) {
        fakeEditUserById(...args);

        throw new Error('test');
    }
    
    async deleteUserById(...args) {
        fakeDeleteUserById(...args);

        throw new Error('test');
    }
    
    async autoSuggestUsers(...args) {
        fakeAutoSuggestUsers(...args);

        throw new Error('test');
    }
}

const fakeUserService = new FakeUserService();
const mockedUserController = new UserController(fakeUserService);

const rejectFakeUserService = new RejectFakeUserService();
const mockedRejectUserController = new UserController(rejectFakeUserService);

describe('[CONTROLLERS] userController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('check getAllUsers', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.getAllUsers(req, res, next);

        expect(fakeGetAllUsers).toHaveBeenCalledWith();
        expect(logInfo).toHaveBeenCalledWith('UserController.getAllUsers');
        expect(res.send).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });
    
    it('check getAllUsers with error', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.getAllUsers(req, res, next);

        expect(fakeGetAllUsers).toHaveBeenCalledWith();
        expect(logInfo).toHaveBeenCalledWith('UserController.getAllUsers');
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.getAllUsers'});
    });

    it('check createUser', async () => {
        const req = { body: 'body' };
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.createUser(req, res, next);

        expect(fakeCreateUser).toHaveBeenCalledWith('body');
        expect(logInfo).toHaveBeenCalledWith('UserController.createUser', ['body']);
        expect(res.send).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });

    
    it('check createUser with error', async () => {
        const req = { body: 'body' };
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.createUser(req, res, next);

        expect(fakeCreateUser).toHaveBeenCalledWith('body');
        expect(logInfo).toHaveBeenCalledWith('UserController.createUser', ['body']);
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.createUser', params: ['body']});
    });
    
    it('check getUserById', async () => {
        const req = { params: { userId: 'userId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.getUserById(req, res, next);

        expect(fakeGetUserById).toHaveBeenCalledWith('userId');
        expect(logInfo).toHaveBeenCalledWith('UserController.getUserById', ['userId']);
        expect(res.json).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });
        
    it('check getUserById when user was not found', async () => {
        const req = { params: { userId: 'noUserId' } };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedUserController.getUserById(req, res, next);

        expect(fakeGetUserById).toHaveBeenCalledWith('noUserId');
        expect(logInfo).toHaveBeenCalledWith('UserController.getUserById', ['noUserId']);
        expect(logError).toHaveBeenCalledWith('UserController.getUserById', 404, ['noUserId']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'User with id noUserId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });

    it('check getUserById with error', async () => {
        const req = { params: { userId: 'userId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.getUserById(req, res, next);

        expect(fakeGetUserById).toHaveBeenCalledWith('userId');
        expect(logInfo).toHaveBeenCalledWith('UserController.getUserById', ['userId']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.getUserById', params: ['userId']});
    });
        
    it('check editUserById', async () => {
        const req = { params: { userId: 'userId' }, body: 'body' };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.editUserById(req, res, next);

        expect(fakeEditUserById).toHaveBeenCalledWith('userId', 'body');
        expect(logInfo).toHaveBeenCalledWith('UserController.editUserById', ['userId', 'body']);
        expect(res.json).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check editUserById when user was not found', async () => {
        const req = { params: { userId: 'noUserId' }, body: 'body' };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedUserController.editUserById(req, res, next);

        expect(fakeEditUserById).toHaveBeenCalledWith('noUserId', 'body');
        expect(logInfo).toHaveBeenCalledWith('UserController.editUserById', ['noUserId', 'body']);
        expect(logError).toHaveBeenCalledWith('UserController.editUserById', 404, ['noUserId', 'body']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'User with id noUserId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check editUserById with error', async () => {
        const req = { params: { userId: 'userId' }, body: 'body' };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.editUserById(req, res, next);

        expect(fakeEditUserById).toHaveBeenCalledWith('userId', 'body');
        expect(logInfo).toHaveBeenCalledWith('UserController.editUserById', ['userId', 'body']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.editUserById', params: ['userId', 'body']});
    });
            
    it('check deleteUserById', async () => {
        const req = { params: { userId: 'userId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.deleteUserById(req, res, next);

        expect(fakeDeleteUserById).toHaveBeenCalledWith('userId');
        expect(logInfo).toHaveBeenCalledWith('UserController.deleteUserById', ['userId']);
        expect(res.json).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check deleteUserById when user was not found', async () => {
        const req = { params: { userId: 'noUserId' } };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedUserController.deleteUserById(req, res, next);

        expect(fakeDeleteUserById).toHaveBeenCalledWith('noUserId');
        expect(logInfo).toHaveBeenCalledWith('UserController.deleteUserById', ['noUserId']);
        expect(logError).toHaveBeenCalledWith('UserController.deleteUserById', 404, ['noUserId']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'User with id noUserId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });
                
    it('check deleteUserById with error', async () => {
        const req = { params: { userId: 'userId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.deleteUserById(req, res, next);

        expect(fakeDeleteUserById).toHaveBeenCalledWith('userId');
        expect(logInfo).toHaveBeenCalledWith('UserController.deleteUserById', ['userId']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.deleteUserById', params: ['userId']});
    });

    it('check autoSuggestUsers', async () => {
        const req = { body: { searchText: 'searchText', limit: 'limit' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedUserController.autoSuggestUsers(req, res, next);

        expect(fakeAutoSuggestUsers).toHaveBeenCalledWith('searchText', 'limit');
        expect(logInfo).toHaveBeenCalledWith('UserController.autoSuggestUsers', ['searchText', 'limit']);
        expect(res.json).toHaveBeenCalledWith(mockedUsers);
        expect(next).not.toHaveBeenCalled();
    });
    
    it('check autoSuggestUsers with error', async () => {
        const req = { body: { searchText: 'searchText', limit: 'limit' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectUserController.autoSuggestUsers(req, res, next);

        expect(fakeAutoSuggestUsers).toHaveBeenCalledWith('searchText', 'limit');
        expect(logInfo).toHaveBeenCalledWith('UserController.autoSuggestUsers', ['searchText', 'limit']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'UserController.autoSuggestUsers', params: ['searchText', 'limit']});
    });
});