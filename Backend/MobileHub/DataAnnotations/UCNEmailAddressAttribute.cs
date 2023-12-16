using System.ComponentModel.DataAnnotations;
using MobileHub.Common;

namespace MobileHub.DataAnnotations
{
    public class UCNEmailAddressAttribute : ValidationAttribute
    {
        public UCNEmailAddressAttribute()
        {
        }

        public UCNEmailAddressAttribute(string errorMessage) : base(errorMessage)
        {
        }
        
        public UCNEmailAddressAttribute(Func<string> errorMessageAccessor) : base(errorMessageAccessor)
        {
        }

        public override bool IsValid(object? value)
        {
            if(value is not string email)
                return false;
            
            var isValidEmail = new EmailAddressAttribute().IsValid(email);

            if (!isValidEmail)
                return false;
            
            try{
                var emailDomain = email.Split('@')[1];
                return RegularExpressions.UCNEmailDomainRegex().IsMatch(emailDomain);

            }
            catch(Exception){
                return false;
            }

        }



    }
}