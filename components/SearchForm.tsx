import Form from 'next/form'
import SearchFormReset from '@/components/SearchFormReset';
import { Search } from 'lucide-react';

function SearchFrom({query} : {query?: string}) {

    return ( 
        <>
            <Form action={'/'} scroll={false} className='search-form'>
                <input
                 type="text" 
                 defaultValue={query}
                 name='query' 
                 className='search-input'
                 placeholder="Search Startups" 
                 />

                <div className='flex gap-2'>
                    {query && <SearchFormReset /> }

                    <button type='submit' className='search-btn text-white'>
                        <Search />
                    </button>
                </div>
            </Form>
        </>
     );
}

export default SearchFrom;