import validatorjs from 'validatorjs';
import MobxReactForm from 'mobx-react-form';
import { search } from 'services/SearchService';

export default class CreateReportForm extends MobxReactForm {
  constructor(history) {
    super();
    this.history = history;
  }

  setup() {
    const fields = {
      results: {
        value: []
      },
      query: {
        rules: 'string',
        placeholder: 'Search for barangay pages...',
        handlers: {
          onChange: (field) => async (e) => {
            field.sync(e);
            e.persist();
            // Get new search query
            const query = e.target.value;

            if (query.trim().length > 0) {
              try {
                const response = await search(query, 1, 5);
                this.$('results').set('value', response.data.data.items.slice(0, 5));

              } catch (e) {

                // Empty search results
                this.$('results').set('value', []);
              }
            } else {
              // Empty search query string
              this.$('results').set('value', []);
            }
          }
        },
      }
    }

    return { fields };
  }

  handlers() {
    return {
      onSubmit: (form) => (e) => {
        if (e.key === 'Enter') {
          this.history.push({
            pathname: '/search',
            search: `?query=${e.target.value}`
          });
        }
      }
    }
  }

  plugins() {
    return { dvr: validatorjs };
  }
} 