*English is my second language, there will be mistakes and typos in the written text below.*

### Rice Retailer Prototype.

>  My first React Native project for course work. 
> 
> This project is all about using UCD (User Centered Design) process to
> convert manual business process into mobile based solution. 
> 
> **Case Study : Local Retailer business.** (Educational Purpose)

images from [pexels](https://www.pexels.com) , [flaticon](https://www.flaticon.com)

![prototype](https://github.com/sronglongchhem/mobile-rice-retailer/blob/master/Documents/assets/README.md.png)

![prototype](https://github.com/sronglongchhem/RiceRetailer/blob/master/Documents/assets/ezgif.com-video-to-gif.gif)


# 1. Task Analysis

**1.1.** **The Word of The Company or Organization**

Rice production plays a huge role in Cambodia economy as it is one of the most popular products in the world. There are many types of rice available such Premium Fragrant, Fragrant,  Premium White,White (Wet season) and White (Dry season) and among of these classifications, there are more name that local people gave to each type of rice. For example: Phka Malis which is known as Jasmine rice. 

“**A Rice Retailer**” is one of a few local family businesses of its kind that run by Ms. A and her husband and it is located at the nearby market place of a small town in Cambodia. They sell wide ranges of rice with different prices. Their customers are local families living nearby town, and occasionally they are from Phnom Penh city too thank to the owner good reputation in the business. Customers can buy from as little as few grams to dozen bags of rice (1bag = 50KG).

Ms. A doing business with local people based on buy now and pay later as an installment business model which built on trust because she knows most of her customers. However, all her business processes are done manually by writing down on a book and using carbon copy paper for duplication.

Beside store owner themselves, there are many people involve in this business such as their children, a part-time employee who is usually a student in the nearby high school, and their neighbor relatives. These people help taking care of front business when needed. For example, when the owner travelling or on high demand occasions like traditional Khmer new year. More importantly, there are customers who provide cash-flow allowing shop to open daily. Local motorbike taxi drivers also contribute to the business by providing delivery service to customer who need few bags of rice at once. Lastly, there are local partners who run big rice distribution business and they provide more rice stock to the owner upon requested.


**1.2.** **Chose Task Scenario = the World of the user**

Many customers prefer buying a few bags of rice and promise to make payment later with specific due date. As a result, Store owner write down the purchase detail in to a record book. Mostly, frequent customers have the whole book for each of them while others share a portion of it. Store owner label all relevant customer names on the cover of book so that they are easily to find. They also create receipt for customer for making a payment later.

**Specific Scenario:**During the family reunion on Water Festival (Bon Om Touk, 2018), Mr. A came to the shop and made a few purchases and promised to pay late, as shown on the table below.

|    Date    |     Type    | Quantity |      Price     |   Total   |
|:----------:|:-----------:|:--------:|:--------------:|:---------:|
| 21/11/2018 |   Jasmine   |   150KG  |     2,000R     |  300,000R |
| 22/11/2018 |   Soy Bean  |    4KG   |     4,000R     |  16,000R  |
|            | Sticky Rice |   10KG   |     3,200R     |  32,000R  |
|            |  Neang Minh |   50KG   |     1,600R     |  80,000R  |
|            |             |          |     Total:     |  428,000R |
| 14/01/2019 |             |          | Promise to pay | -350,000R |

To receive such installment payment, a  **store owner**user group and a specific task scenario are chosen to further investigate their goal and associated task activities as describe in the Detailed Task Description Form in the next page:

**Task** **Result:** By following the task description process

- 4 record of Mr. A are found. Each of them includes date purchase, total and already paid amount.

- Owner receive 350,000 payment from customer.

- Owner update 3 of the record as paid including Jasmine, Soy Bean and Sticky Rice are paid with 0 remaining to be paid.

- Owner update 1 of the record which is Neang Minch with new remaining amount of 78,000R.

- Create an invoice on these 4 updated records.

As discuss about current system on customer payment are done manualy so the many repetition happening during the process of such as writing a recipes for customer and write done the same transaction to the book. Calculate the purchase amount and calculated the total amout of customer own. 

 
**1.3.** **Task Decomposition**

Refer to the procedural task decomposition and associated HTA in the next page.

  
**2.** **Design Rational**

**2.1.** **The “Look and Feel” of the New Design**

There are many principles that focus on software design including Jakob Nielsen’s 10 [Usability Heuristics for User Interface Design](https://www.nngroup.com/articles/ten-usability-heuristics/), Ben Shneiderman’s [The Eight Golden Rules of Interface Design](https://www.interaction-design.org/literature/article/shneiderman-s-eight-golden-rules-will-help-you-design-better-interfaces), Bruce Tognazzini’s [Principles of Interaction Design](https://asktog.com/atc/principles-of-interaction-design/https://asktog.com/atc/principles-of-interaction-design/). There among these principles were adapted on this new design. [More detail here.](https://theblog.adobe.com/4-golden-rules-ui-design/)

1. **Place users in control of the interface**

Users feels more convenient and will learn be able to learn to use the system faster if they can control the interface interaction.

**Make actions reversible**

Providing backtrack capability to user to reverse their actions encourages them to explore the other unfamiliar functions in the application without fear of failure. Therefore, in this new design, user can go back to the previous screen any time before payment is being confirm. Doing so, user can always check back their input data where needed. Moreover, user can be assured not to lose the current action state in case they pressed cancel button accidentally. On any  **Cancel**button that will take users back to Main Screen are embedded with an extra confirmation to make sure it is being pressed internationally.

**Create an easy-to-navigate interface**

The app navigation is designed to be clear and self-evident so that user can enjoy exploring the interface and without requiring much thinking about the its meaning? Or wonder what is the button is for? Words and icons used on action buttons in this design is predictable. It gives the users hint to predict the outcome of the action. For example, the Pay button, and search icon and their functionalities on the Main Screen are self-explanatory to user.

**Provide information feedback.**

User mostly get a feedback base on their interaction with system. By doing so, users will easily be able to archive their goal. All of feedback featured in this design are range from being highlighted in response to touch, to explanation and confirmation alerts. For example, it tell users to input user name first before pressed search button, or asking them confirm their Cancel button actions.

**Accommodate users with different skill levels**

To accomplish their goals, different skill set of users have different interaction approaches to proceed the task scenarios. Therefore, it is advice not to only think only novice when designing by giving them an easy-to-use interface, but instead, provide options that fit with different level of users. Likewise, user goal in this context is to find a specific customer purchase history and receiving the remaining payment and able update the record accordingly. However, users might have different preferences the way they find customer record in the system, therefore, this design provide three options for user to choose to get to customer records on the main screen. It can be done by either scanning QR code on the previous invoice, search by customer name, or access direly from the payment due list.

2. **Make it comfortable for a user to interact with a product**

**Don’t ask users for data they’ve already entered**

Users should not be asked repeatedly to enter any data that they already entered. System should be able to remember and present them accordingly. App is more effective to user when it does most of the work and require less user information input. Base on the storyboard, most of all the user formation and customer detail in this design are stored and can be provided to user where suitable. The whole process from searching customer to printing invoice at the end, require user to input information once which is the amount to receive by the customer. Or twice if users choose search by name approach.

**Design accessible interfaces**

One of the importance things to be considered in order to produce a well-design application is its accessibly. Users of all the ability should be able to use it and hence increase usability. Therefore, color and font size were the top priority on this design because based on user characteristics, they would not be able to read small text especially on the handheld device due low-eye sight. Therefore, font size used is considerably bigger than other applications to let the target user can see the content clearer. Color similar to blue was chosen to make it more familiar to user group because of their daily habit in using Messenger app which is blue by design.

**3.** **Make user interfaces consistent**

Consistency is one of the most important elements to usability because it allows user to transfer their skill and knowledge from one app’ UI to another.

**Visual consistency**

On this design, from one page to another, text color and font are kept the same on any similar case from the previous one to avoid confusion. Moreover, action buttons have been positioned from right to left, from [high emphasis and medium emphasis](https://material.io/design/components/buttons.html#hierarchy-placement) and color are kept consistence throughout design.

**Consistent with user expectations**

Designing an interface that meet user expectation, their mental model would provide users a pleasure experience to continue using the application. There some parts of the design such are user list result on searching page and payment due list on main screen are inspired by users most popular app, Messenger, to give them a sense of familiarity when the use the app for the time.

QR code was chosen over barcode as they serve similar purpose, but in the target user environment, they encounter QR code every day. They know what is QR code and how to scan it, because it was introduce in the Aceleda mobile banking application for quick payment.


Design Rationale Form is in the next page

**2.2.** **Evaluation of the New Design**

There are several main advantages for this new design over the existing current situation. Firstly, new design provides store owner with an instance access to customer record and all the information are filtered to suite the requirement without having to manually go through record books page by page. Next is calculation, store owner does not need to do all total calculation like in current system because they are being calculated by the system.

On the other hand, store owner has been using the current system to complete daily goal for more than a decade. They are already get used to it, therefore shifting their perspective to accept the new design will take time and effort considered that they have little experiences in using mobile applications.

In conclusion, this new design is trying to overcome the business process where all the works are done manually, and instead use system to do all the work providing a greater accessibility, speed in doing business. This design feature could enable store owner to complete their goal and tasks more efficiently, and effectively.
