
 export default class OpinionsHandler {

    /**
     * constructor
     * @param opinionsFormElmId - id of a form element where a new visitor opinion is entered
     * @param opinionsListElmId - id of a html element to which the list of visitor opinions is rendered
     */
    constructor(opinionsFormElmId, opinionsListElmId){ //("opnFrm","opinionsContainer")
        this.opinions = [];

        this.opinionsElm = document.getElementById(opinionsListElmId);
        this.opinionsFrmElm = document.getElementById(opinionsFormElmId);
    }

    /**
     * initialisation of the list of visitor opinions and form submit setup
     */
    init(){
        if (localStorage.myTreesComments) {
            this.opinions = JSON.parse(localStorage.myTreesComments);
        }

        this.opinionsElm.innerHTML = this.opinionArray2html(this.opinions);


        this.opinionsFrmElm.addEventListener("submit", event => this.processOpnFrmData(event));
    }

    /**
     * Processing of the form data with a new visitor opinion
     * @param event - event object, used to prevent normal event (form sending) processing
     */
    processOpnFrmData(event){
        //1.prevent normal event (form sending) processing
        event.preventDefault();

        //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
        const nopName = document.getElementById("name").value.trim();
        const nopComment = document.getElementById("comment").value.trim();
        const nopEmail = document.getElementById("email").value.trim();
        const nopUrl = document.getElementById("url").value.trim();
        const nopPohlavie = document.getElementById("formular").elements["pohlavie"].value;
        const nopOsobneUdaje = document.getElementById("osobne_udaje").checked;
        const nopEmail_novinky = document.getElementById("email_novinky").checked;

        //3. Verify the data
        if(nopName=="" || nopComment=="" || nopEmail == ""){
            window.alert("Please, enter all - name, comment and email");
            return;
        }
        var nopSex = "Neuvedene";
        if(nopPohlavie == '0'){
            nopSex = "Muz";
        }
        if(nopPohlavie == '1'){
            nopSex = "Zena";
        }

        //3. Add the data to the array opinions and local storage
        const newOpinion =
        {
            name: nopName,
            email: nopEmail,
            url: nopUrl,
            comment: nopComment,
            sex: nopSex,
            osobne_udaje: nopOsobneUdaje,
            email_novinky: nopEmail_novinky,
            created: new Date()
    };

        console.log("New opinion:\n "+JSON.stringify(newOpinion));

        this.opinions.push(newOpinion);

        localStorage.myTreesComments = JSON.stringify(this.opinions);


        //4. Update HTML
        this.opinionsElm.innerHTML+=this.opinion2html(newOpinion);



        //5. Reset the form
        this.opinionsFrmElm.reset(); //resets the form
    }

    
    opinion2html(opinion){
        const opinionTemplate=
`
    <section>
       <h3>${opinion.name} <i>(${(new Date(opinion.created)).toDateString()})</i></h3>
       <p>${opinion.sex}</p>
       <p>${opinion.email}</p>
       <p>${opinion.comment}</p>
       <p>${option.url}</p>
    </section>`;
return opinionTemplate;
    }

    /**
     * creates html code for all opinions in an array using the opinion2html method
     * @param sourceData -  an array of visitor opinions
     * @returns {string} - html code with all the opinions
     */
     opinionArray2html(sourceData){
        return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ this.opinion2html(opn),"");
    }

}