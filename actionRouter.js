const actionRouter = require('express').Router();

const actionModel = require('./data/helpers/actionModel');
const projectModel = require('./data/helpers/projectModel');
const codes = require('./statusCodes');

actionRouter.get('/', (req, res) => {
    actionModel
        .get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(error => {
            res.status(500).json(codes.actions.GET_500);
        })
})

actionRouter.get('/:id', (req, res) => {
    const {id } = req.params

    actionModel
        .get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(error => {
            res.status(404).json(codes.actions[404]);
        })
})

actionRouter.post('/', (req, res) => {
    const action = {...req.body};

    if(!action.description || !action.notes) {
        res.status(400).json(codes.actions.MISSING_FIELD);
        return;
    }

    if(action.description.length > 128 || action.notes.length > 128) {
        res.status(400).json(codes.actions.OVER_128);
        return;
    }

    if(!action.project_id) {
        res.status(400).json(codes.actions.NO_PROJECT_ID);
        return;
    }

    projectModel.get(action.project_id)
    .then(response => {
        if(!response.id) {
            res.status(404).json(codes.projects[404]);
            return
        } 
        
        actionModel.insert(action)
        .then(response => res.status(201).json(codes.actions.CREATED))
        .catch(error => res.status(500).json(codes.actions.POST_500));

    }).catch(error => res.status(500).json(codes.projects.GET_500));
    
})

actionRouter.put('/:id', (req, res) => {
    const action = {...req.body};
    const { id } = req.params;

    if(!action.description && !action.notes && !action.completed) {
        res.status(400).json(codes.actions.NO_UPDATE_DATA);
        return;
    }

    if(action.description.length > 128 || action.notes.length > 128) {
        res.status(400).json(codes.actions.OVER_128);
        return;
    }

    actionModel.get(id)
    .then(response => {
        if(!response.id) {
            res.status(404).json(codes.actions[404]);
            return
        } 
        
        actionModel.update(id, action)
        .then(response => res.status(200).json(codes.actions.UPDATED))
        .catch(error => res.status(500).json(codes.actions.PUT_500));

    }).catch(error => res.status(500).json(codes.projects.GET_500));
    
})



actionRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    actionModel.get(id)
    .then(response => {
        if(!response.id) {
            res.status(404).json(codes.actions[404]);
            return
        } 
        
        actionModel.remove(id)
        .then(response => res.status(200).json(codes.actions.REMOVED))
        .catch(error => res.status(500).json(codes.actions.PUT_500));

    }).catch(error => res.status(500).json(codes.projects.GET_500));
    
})




module.exports = actionRouter;