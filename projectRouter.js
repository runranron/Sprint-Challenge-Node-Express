const projectRouter = require('express').Router();

const projectModel = require('./data/helpers/projectModel');
const codes = require('./statusCodes');

projectRouter.get('/', (req, res) => {
    projectModel
        .get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json(codes.projects.GET_500);
        })
})

projectRouter.get('/:id', (req, res) => {
    const { id } = req.params

    projectModel
        .get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(404).json(codes.projects[404]);
        })
})

projectRouter.get('/:id/actions', (req, res) => {
    const { id } = req.params

    projectModel.get(id)
    
    .then(project => {
    projectModel.getProjectActions(id)

    .then(project => {
        res.status(200).json(project);})
    })

    .catch(error => {
        res.status(404).json(codes.projects[404]);
    })
})

projectRouter.post('/', (req, res) => {
    const project = {...req.body};

    if(!project.description || !project.name) {
        res.status(400).json(codes.projects.MISSING_FIELD);
        return;
    }

    if(project.description.length > 128 || project.name.length > 128) {
        res.status(400).json(codes.projects.OVER_128);
        return;
    }

    projectModel.insert(project)
    .then(response => res.status(201).json(codes.projects.CREATED))
    .catch(error => res.status(500).json(codes.projects.POST_500));
    
})

projectRouter.put('/:id', (req, res) => {
    const project = {...req.body};
    const { id } = req.params;

    if(!project.description && !project.notes && !project.completed) {
        res.status(400).json(codes.projects.NO_UPDATE_DATA);
        return;
    }

    if(project.description.length > 128 || project.notes.length > 128) {
        res.status(400).json(codes.projects.OVER_128);
        return;
    }

    projectModel.get(id)
    .then(response => {
        if(!response.id) {
            res.status(404).json(codes.projects[404]);
            return
        } 
        
        projectModel.update(id, project)
        .then(response => res.status(200).json(codes.projects.UPDATED))
        .catch(error => res.status(500).json(codes.projects.PUT_500));

    }).catch(error => res.status(500).json(codes.projects.GET_500));
    
})



projectRouter.delete('/:id', (req, res) => {
    const { id } = req.params;

    projectModel.get(id)
    .then(response => {
        if(!response.id) {
            res.status(404).json(codes.projects[404]);
            return
        } 
        
        projectModel.remove(id)
        .then(response => res.status(200).json(codes.projects.REMOVED))
        .catch(error => res.status(500).json(codes.projects.PUT_500));

    }).catch(error => res.status(500).json(codes.projects.GET_500));
    
})




module.exports = projectRouter;