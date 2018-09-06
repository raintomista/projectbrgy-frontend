import validatorjs from 'validatorjs';

import { addComment, getCommentsByPostId } from 'services/CommentService';

export const plugins = { dvr: validatorjs };

export const fields = {
    postId: {
        rules: 'required',
    },
    // Total Comments of the post
    statsComments: {
        rules: 'required|integer',
    },
    commentMessage: {
        rules: 'required|string',
        placeholder: 'Write a comment...',
        value: ''
    },
    comments: {
        value: []
    },
    newComments: {
        value: []
    }
};

export const hooks = {
    async onSuccess(form) {
        const { postId, commentMessage } = form.values();
        form.$('commentMessage').set('disabled', true);
        

        try {
            const response = await addComment(postId, commentMessage);
            const newComments = form.select('newComments').value;
            const statsComments = form.select('statsComments').value;

            // Update comments
            newComments.push(response.data.data);
            form.select('newComments').set('value', newComments);
            form.select('statsComments').set('value', statsComments + 1);

            // Clear comment box
            form.select('commentMessage').clear();

            // Re-enable form
            form.$('commentMessage').set('disabled', false);
        }
        catch (e) {
            console.log(e);
        }
    }, 
    onError(form) {
        console.log(form.errors())
    }
}