import { groupService } from '../services/groupService';

class GroupController {
    constructor(groupService) {
        this.groupService = groupService;
    }

    getAllGroups(req, res, next) {
        return this.groupService.getAllGroups()
            .then((allGroups) => res.send(allGroups))
            .catch((error) => console.error(error));
    }

    createGroup(req, res, next) {
        return this.groupService.createGroup(req.body)
            .then((group) => res.send(group))
            .catch((error) => console.error(error));
    }

    getGroupById(req, res, next) {
        return this.groupService.getGroupById(req.params.groupId)
            .then((group) => {
                if (!group) {
                    return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
                }
            
                res.json(group);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    editGroupById(req, res, next) {
        return this.groupService.editGroupById(req.params.groupId, req.body)
            .then((group) => {
                if (!group) {
                    return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
                }
            
                res.json(group);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    deleteGroupById(req, res, next) {
        return this.groupService.deleteGroupById(req.params.groupId)
            .then((group) => {
                if (!group) {
                    return res.status(404).json({ message: `Group with id ${req.params.groupId} not found` });
                }
            
                res.json(group);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    autoSuggestGroups(req, res, next) {
        const { searchText, limit } = req.body;

        return this.groupService.autoSuggestGroups(searchText, limit)
            .then((allGroups) => res.send(allGroups))
            .catch((error) => console.error(error));
    }
}

const groupController = new GroupController(groupService);

export {
    GroupController,
    groupController,
}