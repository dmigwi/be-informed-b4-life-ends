from bi.bucketlistapi.tests.basetest import BaseTest


class TestWorstCase(BaseTest):

    def test_login_with_wrong_credentails(self):
        '''Test Error returned when wrong login credentials are used'''
        login_credentials = {"username": "post", "password": "post"}
        response = self.client.post('/api/v1/auth/login',
                                    format='json',
                                    data=login_credentials,
                                    )
        self.assertEqual({'non_field_errors':
                          ['Unable to log in with provided credentials.']},
                         response.data)

    def test_get_specified_number_of_bucketlists(self):
        '''Test if the specified No. of BucketLists is returned'''
        response = self.client.get('/api/v1/bucketlists?page_size=2')
        self.assertLess(response.data.get('count'), 3)

    def test_create_bucketlist_without_name(self):
        '''Test error returned when bucketlist name is not provided'''
        bucketlistss = {'name': ''}
        response = self.client.post('/api/v1/bucketlists',
                                    format='json',
                                    data=bucketlistss)
        self.assertEquals({'name': ['This field may not be blank.']},
                          response.data)

    def test_get_bucketlist_not_available(self):
        '''
        Test error returned when bucketlist bieng retrieved doesn't exist
        '''
        response = self.client.get('/api/v1/bucketlists/1000')
        self.assertEquals({'detail': 'Not found.'}, response.data)

    def test_update_bucketlist_not_available(self):
        '''
        Test error returned when update is being
        made on a none existent bucketlist
        '''
        bucketlists = {'name': 'Learn how to Use Vim'}
        response = self.client.put('/api/v1/bucketlists/1000',
                                   data=bucketlists)
        self.assertEqual({'detail': 'Not found.'}, response.data)

    def test_delete_bucketlist_not_available(self):
        '''Test error returned when a none existent bucketlist
         is being deleted'''
        response = self.client.delete('/api/v1/bucketlists/1000')
        self.assertEqual({'detail': 'Not found.'}, response.data)

    def test_create_items_in_a_non_existent_bucketlist(self):
        '''Test error returned when a task  is being created
        in a none existent bucketlist'''
        items = {'name': 'This does not exist'}
        response = self.client.post('/api/v1/bucketlists/2000/items',
                                    format='json',
                                    data=items)
        self.assertEqual({'detail': 'BucketList Not found.'}, response.data)

    def test_update_item_in_bucketlist_that_doesnt_exist(self):
        '''Test error returned when a task update is being
         made in a none existent bucketlist'''
        items = {'name': 'This doesnt exist',
                 'done': True}
        response = self.client.put('/api/v1/bucketlists/2000/items/1',
                                   format='json',
                                   data=items)
        self.assertEqual({'detail': 'BucketList Not found.'}, response.data)

    def test_delete_item_in_bucketlist_that_doesnt_exist(self):
        '''Test error returned when a task is being deleted
        in none existent bucketlist'''
        response = self.client.delete('/api/v1/bucketlists/2000/items/1')
        self.assertEqual({'detail': 'BucketList Not found.'}, response.data)

    def test_update_item_not_in_bucketlist(self):
        '''Test error returned when a none existent task is bieng updated'''
        items = {'name': 'This doesnt exist',
                 'done': True}
        response = self.client.put('/api/v1/bucketlists/1/items/1121',
                                   format='json',
                                   data=items
                                   )
        self.assertEqual({'detail': 'Not found.'}, response.data)

    def test_delete_item_not_in_bucketlist(self):
        '''Test error returned when a none existent task is being deleted'''
        response = self.client.delete('/api/v1/bucketlists/1/items/1234',)
        self.assertEqual({'detail': 'Not found.'}, response.data)
