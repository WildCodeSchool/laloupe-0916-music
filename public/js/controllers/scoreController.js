function scoreController(scoreService, barService, noteService, $location, $routeParams) {
    this.scoreService = scoreService;
    this.barService = barService;
    this.noteService = noteService;
    this.$location = $location;


    this.scoreCreate = (score) => {
        this.scoreService.create(score.nameScore, score.levelScore, score.tempoScore, score.wordingScore).then((res) => {

            this.currentScore = res.data._id;
            console.log(res.data._id);
            console.log("PARTITION OK");
            this.numBitBar = 0;
            this.referenceValueBar = 0;
            this.orderBar = 1;

            this.barService.create(this.numBitBar, this.referenceValueBar, this.orderBar).then((res) => {

                this.currentBar = res.data._id;
                console.log(res.data._id);
                console.log("BAR VIDE OK");
                this.scoreService.addBarToScore(this.currentScore, this.currentBar).then(() => {
                    console.log("Ajout mesure dans partition");
                    this.$location.path('/score/editing/'+this.currentScore);
                });
            });
        });
        //
        // this.scoreService.addBarToScore(score._id,)
    };

    this.scoreafficher = (id) => {
        console.log(id);
        this.currentEditScore=id;
        this.$location.path('/score/editing/'+id);
    };



    this.verificationdelapartition = () => {
      console.log($routeParams.id);
    };

    this.load = () => {
        this.scoreService.getAll().then((res) => {
            this.scores = res.data;
        });
    };

    this.load();

    this.barCreate = () => {
        this.barService.create(this.bar).then(() => {
            this.load();
        });
    };
    this.noteCreate = () => {
        this.noteService.create(this.note).then(() => {
            this.load();
        });
    };
}