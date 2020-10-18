import { GroupController } from '../groupController';
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

let fakeGetAllGroups = jest.fn();
let fakeCreateGroup = jest.fn();
let fakeGetGroupById = jest.fn();
let fakeEditGroupById = jest.fn();
let fakeDeleteGroupById = jest.fn();
let fakeAutoSuggestGroups = jest.fn();

const mockedGroups = {};
const mockedGroup = {};

class FakeGroupService {
    getAllGroups(...args) {
        fakeGetAllGroups(...args);

        return mockedGroups;
    }
    
    async createGroup(...args) {
        fakeCreateGroup(...args);

        return mockedGroup;
    }
    
    async getGroupById(...args) {
        fakeGetGroupById(...args);

        if (args[0] === 'groupId') {
            return mockedGroup;
        }

        return undefined;
    }
    
    async editGroupById(...args) {
        fakeEditGroupById(...args);
        
        if (args[0] === 'groupId') {
            return mockedGroup;
        }

        return undefined;
    }
    
    async deleteGroupById(...args) {
        fakeDeleteGroupById(...args);
        
        if (args[0] === 'groupId') {
            return mockedGroup;
        }

        return undefined;
    }
    
    async autoSuggestGroups(...args) {
        fakeAutoSuggestGroups(...args);
        
        return mockedGroups;
    }
}

class RejectFakeGroupService {
    getAllGroups(...args) {
        fakeGetAllGroups(...args);

        throw new Error('test');
    }
    
    async createGroup(...args) {
        fakeCreateGroup(...args);

        throw new Error('test');
    }
    
    async getGroupById(...args) {
        fakeGetGroupById(...args);

        throw new Error('test');
    }
    
    async editGroupById(...args) {
        fakeEditGroupById(...args);

        throw new Error('test');
    }
    
    async deleteGroupById(...args) {
        fakeDeleteGroupById(...args);

        throw new Error('test');
    }
    
    async autoSuggestGroups(...args) {
        fakeAutoSuggestGroups(...args);

        throw new Error('test');
    }
}

const fakeGroupService = new FakeGroupService();
const mockedGroupController = new GroupController(fakeGroupService);

const rejectFakeGroupService = new RejectFakeGroupService();
const mockedRejectGroupController = new GroupController(rejectFakeGroupService);

describe('[CONTROLLERS] groupController', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('check getAllGroups', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.getAllGroups(req, res, next);

        expect(fakeGetAllGroups).toHaveBeenCalledWith();
        expect(logInfo).toHaveBeenCalledWith('GroupController.getAllGroups');
        expect(res.send).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });
    
    it('check getAllGroups with error', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.getAllGroups(req, res, next);

        expect(fakeGetAllGroups).toHaveBeenCalledWith();
        expect(logInfo).toHaveBeenCalledWith('GroupController.getAllGroups');
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.getAllGroups'});
    });

    it('check createGroup', async () => {
        const req = { body: 'body' };
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.createGroup(req, res, next);

        expect(fakeCreateGroup).toHaveBeenCalledWith('body');
        expect(logInfo).toHaveBeenCalledWith('GroupController.createGroup', ['body']);
        expect(res.send).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });

    
    it('check createGroup with error', async () => {
        const req = { body: 'body' };
        const res = {
            send: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.createGroup(req, res, next);

        expect(fakeCreateGroup).toHaveBeenCalledWith('body');
        expect(logInfo).toHaveBeenCalledWith('GroupController.createGroup', ['body']);
        expect(res.send).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.createGroup', params: ['body']});
    });
    
    it('check getGroupById', async () => {
        const req = { params: { groupId: 'groupId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.getGroupById(req, res, next);

        expect(fakeGetGroupById).toHaveBeenCalledWith('groupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.getGroupById', ['groupId']);
        expect(res.json).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });
        
    it('check getGroupById when group was not found', async () => {
        const req = { params: { groupId: 'noGroupId' } };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedGroupController.getGroupById(req, res, next);

        expect(fakeGetGroupById).toHaveBeenCalledWith('noGroupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.getGroupById', ['noGroupId']);
        expect(logError).toHaveBeenCalledWith('GroupController.getGroupById', 404, ['noGroupId']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Group with id noGroupId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });

    it('check getGroupById with error', async () => {
        const req = { params: { groupId: 'groupId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.getGroupById(req, res, next);

        expect(fakeGetGroupById).toHaveBeenCalledWith('groupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.getGroupById', ['groupId']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.getGroupById', params: ['groupId']});
    });
        
    it('check editGroupById', async () => {
        const req = { params: { groupId: 'groupId' }, body: 'body' };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.editGroupById(req, res, next);

        expect(fakeEditGroupById).toHaveBeenCalledWith('groupId', 'body');
        expect(logInfo).toHaveBeenCalledWith('GroupController.editGroupById', ['groupId', 'body']);
        expect(res.json).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check editGroupById when group was not found', async () => {
        const req = { params: { groupId: 'noGroupId' }, body: 'body' };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedGroupController.editGroupById(req, res, next);

        expect(fakeEditGroupById).toHaveBeenCalledWith('noGroupId', 'body');
        expect(logInfo).toHaveBeenCalledWith('GroupController.editGroupById', ['noGroupId', 'body']);
        expect(logError).toHaveBeenCalledWith('GroupController.editGroupById', 404, ['noGroupId', 'body']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Group with id noGroupId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check editGroupById with error', async () => {
        const req = { params: { groupId: 'groupId' }, body: 'body' };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.editGroupById(req, res, next);

        expect(fakeEditGroupById).toHaveBeenCalledWith('groupId', 'body');
        expect(logInfo).toHaveBeenCalledWith('GroupController.editGroupById', ['groupId', 'body']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.editGroupById', params: ['groupId', 'body']});
    });
            
    it('check deleteGroupById', async () => {
        const req = { params: { groupId: 'groupId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.deleteGroupById(req, res, next);

        expect(fakeDeleteGroupById).toHaveBeenCalledWith('groupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.deleteGroupById', ['groupId']);
        expect(res.json).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });
            
    it('check deleteGroupById when group was not found', async () => {
        const req = { params: { groupId: 'noGroupId' } };
        const json = jest.fn();
        const status = jest.fn(() => ({ json: json }));
        const res = {
            status: status,
        };
        const next = jest.fn();

        await mockedGroupController.deleteGroupById(req, res, next);

        expect(fakeDeleteGroupById).toHaveBeenCalledWith('noGroupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.deleteGroupById', ['noGroupId']);
        expect(logError).toHaveBeenCalledWith('GroupController.deleteGroupById', 404, ['noGroupId']);
        expect(status).toHaveBeenCalledWith(404);
        expect(json).toHaveBeenCalledWith({ message: 'Group with id noGroupId was not found.' });
        expect(next).not.toHaveBeenCalled();
    });
                
    it('check deleteGroupById with error', async () => {
        const req = { params: { groupId: 'groupId' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.deleteGroupById(req, res, next);

        expect(fakeDeleteGroupById).toHaveBeenCalledWith('groupId');
        expect(logInfo).toHaveBeenCalledWith('GroupController.deleteGroupById', ['groupId']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.deleteGroupById', params: ['groupId']});
    });

    it('check autoSuggestGroups', async () => {
        const req = { body: { searchText: 'searchText', limit: 'limit' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedGroupController.autoSuggestGroups(req, res, next);

        expect(fakeAutoSuggestGroups).toHaveBeenCalledWith('searchText', 'limit');
        expect(logInfo).toHaveBeenCalledWith('GroupController.autoSuggestGroups', ['searchText', 'limit']);
        expect(res.json).toHaveBeenCalledWith(mockedGroups);
        expect(next).not.toHaveBeenCalled();
    });
    
    it('check autoSuggestGroups with error', async () => {
        const req = { body: { searchText: 'searchText', limit: 'limit' } };
        const res = {
            json: jest.fn(),
        };
        const next = jest.fn();

        await mockedRejectGroupController.autoSuggestGroups(req, res, next);

        expect(fakeAutoSuggestGroups).toHaveBeenCalledWith('searchText', 'limit');
        expect(logInfo).toHaveBeenCalledWith('GroupController.autoSuggestGroups', ['searchText', 'limit']);
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalledWith({ code: 500, error: new Error('test'), method: 'GroupController.autoSuggestGroups', params: ['searchText', 'limit']});
    });
});