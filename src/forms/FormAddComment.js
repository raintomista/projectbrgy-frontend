/*--------------- Utils ---------------*/
import validatorjs from 'validatorjs';
import RootStore from 'stores/RootStore';

import { addComment } from 'services/CommentService';
import { getCommentsByPostId } from 'services/CommentService';

export const plugins = { dvr: validatorjs };

export const fields = {
    postId: {
        rules: 'required',
    },
    message: {
        rules: 'required|string',
        placeholder: 'Write a comment...'
    },
    comments: {
        value: []
    },
    myComments: {
        value: []
    }
};

export const hooks = {
    async onSuccess(form) {
        const { postId, message } = form.values();
        form.set('disabled', true);

        try {
            const response = await addComment(postId, message);
            const myComments = form.select('myComments').value;

            // Update comments
            myComments.unshift(response.data.data);         
            form.select('myComments').set('value', myComments);

            // Clear comment box
            form.select('message').clear();

            // Re-enable form
            form.set('disabled', false);            
        } 
        catch (e) {
            console.log(e);
        }
    }
}
