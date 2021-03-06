# CoderSchool FTW - _ Github Issue Project _

Created with love by: `Sierra - Group 2(Chloe Shin, Hai Chung, Anh Khoa Nguyen, Cuong Tran, Vu Nguyen)`

View online at: [HERE](https://group2-cchub.netlify.com)

One or two sentence summary of your project.

## Video Walkthrough

Here's a walkthrough of implemented user stories.

To create a GIF, use [LiceCap](http://www.cockos.com/licecap/), [RecordIt](http://www.recordit.co), or [Loom](http://www.useloom.com), and link the image here in the markdown.

```
<img src='http://i.imgur.com/link/to/your/gif/file.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />
```


## Required Features 🎯

- [x] The user can enter a repository in a search bar, click "search", and see the associated issues. The repository should be of the format owner/repo-name, e.g. facebook/react.
- [ ] If the repository does not exist, the user should see a proper error message.
- [x] The user should be able to see the following information for each issue:

Issue Title _ Number of the issue
Owner of the Issue
Owner Avatar _ How long ago the issue was created in a human-friendly format (e.g. 2 days ago)
Body of the Issue
Label - note the color as returned by the API.
State of Issue (Open/Closed).
The user should be able to see multiple pages of results, by clicking a pagination control.

- [x] The user should be able to see the body of the issue rendered in markdown.
- [x] The user should be able to create a new issue via a modal for the repository, by clicking on a "new issue" button. Clicking on this button will pop open a modal that asks for the requisite fields.
- [x] If there is an error creating the issue (for example, the user not supplying all required parameters), there should be a nice error message to the user.

## Optional User Stories

- [x] The user can see more details (including comments!) in a modal that's opened by clicking on the title of the issue.
- [x] The user, upon opening this modal, can add a comment via a textarea at the bottom of the page.
- [ ] The user, upon opening the modal, can close the issue. If the person does not have the appropriate access to close an issue, the user sees a nicely formatted error message.
- [ ] The user can see reactions attached to each comment (Reactions API).
- [ ] The user can add reactions to a comment (API documentation).

- [ ] Input Fuzzy Matching: the user should be able to type in either https://github.com/facebook/react or facebook/react, BOTH should work.


- [ ] User can see a filter by language on the left of result screen.
- [x] Instead of using Modal to show issue, use React Router (link) to navigate to different URL issues/:issueId to display the full issue. Have the Back button to go back to the previous page (from the individual issue page).

Preview

## Additional User Stories

- [x] Landing Page for start

## Time Spent and Lessons Learned

Time spent: 32 hours spent in total.

Describe any challenges encountered while building the app:
Call API by using token was the most difficult part as there are many bugs/ errors while loading page. 


## License

    Copyright [Sierra Group 2] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

