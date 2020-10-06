import { groupService } from '../services/groupService';
import { logInfo, logError } from '../log';

class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }

    async getAllGroups(req, res, next) {
        logInfo('GroupController.getAllGroups');

        try {
            const groups = await this.groupService.getAllGroups();

            return res.send(groups);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.getAllGroups', })
        }
    }

    async createGroup(req, res, next) {
        logInfo('GroupController.createGroup', [req.body]);

        try {
            const group = await this.groupService.createGroup(req.body);

            return res.send(group);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.createGroup', params: [req.body] })
        }
    }

    async getGroupById(req, res, next) {
        logInfo('GroupController.getGroupById', [req.params.groupId]);

        try {
            const group = await this.groupService.getGroupById(req.params.groupId);
            
            if (!group) {
                logError('GroupController.getGroupById', 404, [req.params.userId]);

                return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
            }

            return res.json(group);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.getGroupById', params: [req.params.groupId] })
        }
    }

    async editGroupById(req, res, next) {
        logInfo('GroupController.editGroupById', [req.params.groupId, req.body]);

        try {
            const group = await this.groupService.editGroupById(req.params.groupId, req.body);
            
            if (!group) {
                logError('GroupController.editGroupById', 404, [req.params.groupId, req.body]);

                return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
            }

            return res.json(group);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.editGroupById', params: [req.params.groupId, req.body] })
        }
    }

    async deleteGroupById(req, res, next) {
        logInfo('GroupController.deleteGroupById', [req.params.groupId]);

        try {
            const group = await this.groupService.deleteGroupById(req.params.groupId);
            
            if (!group) {
                logError('GroupController.deleteGroupById', 404, [req.params.groupId]);

                return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
            }

            return res.json(group);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.deleteGroupById', params: [req.params.groupId] })
        }
    }

    async autoSuggestGroups(req, res, next) {
        logInfo('GroupController.autoSuggestGroups', [searchText, limit]);

        try {
            const { searchText, limit } = req.body;
            const result = await this.groupService.autoSuggestGroups(searchText, limit);

            return res.json(result);
        }
        catch (error) {
            next({ error: error, code: 500, method: 'GroupController.autoSuggestGroups', params: [searchText, limit] })
        }
    }
}

const groupController = new GroupController(groupService);

export {
    GroupController,
    groupController,
}