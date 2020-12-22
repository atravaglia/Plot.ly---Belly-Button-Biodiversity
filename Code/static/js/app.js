function getPlots(id) {

        d3.json("samples.json").then (data0 =>{
            
            console.log(data0)

            // Use sample_values as the values for the bar chart.
            var sampleValues =  data0.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)

            // Use otu_ids as the labels for the bar chart. Display the top 10 OTUs. 
            // Reverse them like in the example
            var top10OTU = ( data0.samples[0].otu_ids.slice(0, 10)).reverse();     
            
            
            // var sampleID = data0.samples[0].otu_ids;
            // console.log(sampleID)
            
            // Use otu_labels as the hovertext for the chart. Display only the 
            // top 10

            var otuLabels =  data0.samples[0].otu_labels.slice(0,10);
            console.log(`These are the labels: ${otuLabels}`)
        

            var OTU_id = top10OTU.map(OTUplot => "OTU " + OTUplot + "  ");
            console.log(`These are the OTU ids: ${OTU_id}`)


            // Create a horizontal bar chart to display the 
            // top 10 OTUs found in that individual.

            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: otuLabels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
           
            var data = [trace];
    
            var layout = {
                // title: "Top 10 OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 150,
                    r: 10,
                    t: 30,
                    b: 20
                }
            };
    
            Plotly.newPlot("bar", data, layout);



            // Create a bubble chart that displays each sample.

            var traceBubble = {

                // Use otu_ids for the x values.
                x: data0.samples[0].otu_ids,

                // Use sample_values for the y values.
                y: data0.samples[0].sample_values,
                
                // Use otu_ids for the marker colors.
                mode: "markers",
                marker: {
                    size: data0.samples[0].sample_values,
                    color: data0.samples[0].otu_ids
                },

                // Use otu_labels for the text values.
                text:  data0.samples[0].otu_labels
    
            };
   
            var layoutBubble = {
                xaxis:{title: "OTU ID"},
                height: 600,
                width: 1000
            };
    
            var dataBubble = [traceBubble];
    
        Plotly.newPlot("bubble", dataBubble, layoutBubble); 
        
        });

    }  


    // Display the sample metadata, i.e., an individual's demographic information.
    // Display each key-value pair from the metadata JSON object somewhere on the page.


    // Open the json file, create the demographic table and populate it with data
    function Demographics(id) {
            d3.json("samples.json").then((data)=> {
    
            var sampleMeta = data.metadata;
            console.log(sampleMeta)
    
            var metadata2 = sampleMeta.filter(metadata1 => metadata1.id.toString() === id)[0];
          
            var demoData = d3.select("#sample-metadata");
            
            // reset the table
            demoData.html("");
    
            Object.entries(metadata2).forEach((key) => {   
                demoData.append("h4").text(key[0] + ":   " + key[1]);    
            });
        });
    }


        function optionChanged(id) {
        getPlots(id);
        Demographics(id);
    }
    
        // Display data    

    function init() {
        var dropdown = d3.select("#selDataset");
  
        d3.json("samples.json").then((metadata3)=> {
            console.log(metadata3)
    
            metadata3.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            
            getPlots(metadata3.names[0]);
            Demographics(metadata3.names[0]);
        });
    }


    
    init();