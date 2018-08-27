const Standup = require('../models/standup.server.model.js');

let memberNameSet = new Set();

exports.list = (req, res) => {
    let query = Standup.find();
    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec((err, results) => {
            let meetingNotes = [];
            memberNameSet = new Set();
            results.forEach((mem) => {
                if(mem.memberName){
                    memberNameSet.add(mem.memberName);
                    meetingNotes.push(mem);
                }
            });

           res.render('index', {title: 'Standup - List', notes: meetingNotes, members: Array.from(memberNameSet).sort()});
        });

};

exports.filterByMember = (req, res) => {
    let query = Standup.find();
    let filter = req.body.memberName;

    query.sort({ createdOn: 'desc' });

    if (filter.length > 0)
    {
        query.where({ memberName: filter})
    }

    query.exec((err, results) => {
        let meetingNotes = [];
        memberNameSet = new Set();
        results.forEach((mem) => {
            if(mem.memberName){
                memberNameSet.add(mem.memberName);
                meetingNotes.push(mem);
            }
        });

       res.render('index', {title: 'Standup - List', notes: meetingNotes, members: Array.from(memberNameSet).sort()});
    });
};


exports.create = (req, res) => {
    let entry = new Standup({
        memberName: req.body.memberName,
        project: req.body.project,
        workYesterday: req.body.workYesterday,
        workToday: req.body.workToday,
        impediment: req.body.impediment
    });

    // form validation
    // entry.schema.patj('memberName').validate((value) => {
    //     return value != 'None';
    // }, 'You must select a team member name');

    entry.save((err) => {
        if (err) {
            let errMsg = 'Sorry, there was an error saving the stand-up meeting note. ' + err;
            res.render('newnote', { title: 'Standup - New Note (error)', message: errMsg,  members: Array.from(memberNameSet).sort()});
        }
        else {
            console.log('Stand-up meeting note was saved!');
            // Redirect to the home page to display list of notes...
            res.redirect(301, '/');
        }
    });
};

exports.getNote = (req, res) => {
    let query = Standup.find();
    query.sort({ createdOn: 'desc'})
        .limit(12)
        .exec((err, results) => {
            memberNameSet = new Set();
            results.forEach((mem) => {
                if(mem.memberName){
                    memberNameSet.add(mem.memberName);
                }
            });

           res.render('newnote', {title:'Standup - New Note', members: Array.from(memberNameSet).sort()});
        });

    //res.render('newnote', { title: 'Standup - New Note' });
}