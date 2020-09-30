import { Meteor } from "meteor/meteor";
import { LinksCollection } from "/src/models/links";

function insertLink({ title, url }) {
    LinksCollection.insert({ title, url, createdAt: new Date() });
}

Meteor.startup(() => {
    // If the Links collection is empty, add some data.
    if (LinksCollection.find().count() === 0) {
        insertLink({
            title: "Do the Tutorial",
            url: "https://www.meteor.com/tutorials/react/creating-an-app",
        });
    }
});
